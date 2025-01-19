import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './repository/index.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    return this.userRepository.find()
  }

  async findOneWithEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password'],
    });
  }


  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } })
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } })
  }
}
