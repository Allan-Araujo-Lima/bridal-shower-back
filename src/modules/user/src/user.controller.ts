import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { string } from 'joi';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() CreateUserDto: CreateUserDto) {
    const user = { ...CreateUserDto, id: undefined, created_at: new Date(), updated_at: new Date() };
    return this.userService.create(user);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }
}
