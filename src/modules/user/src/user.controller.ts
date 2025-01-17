import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() CreateUserDto: CreateUserDto) {
    const user = { ...CreateUserDto, id: undefined, created_at: new Date(), updated_at: new Date() };
    return this.userService.create(user);
  }
}
