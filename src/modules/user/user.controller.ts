import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpExceptionFilter } from 'src/utils/http-exceptions.filter';
import { Public } from '../auth/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('signup')
  async create(@Body() CreateUserDto: CreateUserDto) {
    const user = { ...CreateUserDto, id: undefined, created_at: new Date(), updated_at: new Date() };
    return await this.userService.create(user);
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
