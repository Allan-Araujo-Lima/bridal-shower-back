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

    user.password = bcrypt.hashSync(
      user.password,
      Number(process.env.SALT_PASSWORD),
    );

    await this.userRepository.save(user);

  }
  findAllUsers() {
    const users = this.userRepository.find()

    if (!users) {
      throw new HttpException('No such user', 404);
    }

    return users;
  }

  async findOneWithEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  findByEmail(email: string) {
    if (!email) {
      throw new HttpException('Email not provided', 400);
    }

    const user = this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  findOne(id: string) {
    const user = this.userRepository.findOne({ where: { id: id } })

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    const userId = await this.userRepository.findOne({ where: { id: id } });

    if (!userId) {
      throw new HttpException('User not found', 404);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.userRepository.update({ expiration_date: LessThan(new Date()) }, { is_active: false });
    return console.log('Cron job executed');
  }
}
