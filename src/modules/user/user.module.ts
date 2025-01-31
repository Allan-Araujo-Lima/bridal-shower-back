import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './repository/index.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule { }
