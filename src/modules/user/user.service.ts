import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './repository/index.entity';
import { LessThan, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user-dto';
import * as bcrypt from 'bcrypt';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(user: User) {
    const verifyUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (verifyUser) {
      throw new HttpException('User already exists', 400);
    }

    user.password = await bcrypt.hash(
      user.password,
      Number(process.env.SALT_PASSWORD),
    );

    await this.userRepository.save(user);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();

    if (!users.length) {
      throw new HttpException('No users found', 404);
    }

    return users;
  }

  async findOneWithEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new HttpException('Email not provided', 400);
    }

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async activeUser(id: string, productId: string) {
    const productDurations = {
      '1': 3,
      '2': 6,
      '3': 9,
      '4': 12,
    };

    const duration = productDurations[productId];
    if (!duration) {
      throw new HttpException('Product not found', 404);
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    let expiration_date = new Date();

    if (user.expiration_date && user.expiration_date.getTime() > new Date().getTime()) {
      expiration_date = user.expiration_date;
    }

    expiration_date.setMonth(expiration_date.getMonth() + duration);

    await this.userRepository.update(id, { expiration_date, is_active: true });
    return this.userRepository.findOne({ where: { id } });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const result = await this.userRepository.update(
      { expiration_date: LessThan(new Date()) },
      { is_active: false },
    );
    console.log('Cron job executed', result.affected, 'users updated');
  }
}
