import { Body, Controller, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpExceptionFilter } from 'src/utils/http-exceptions.filter';
import { Public } from '../auth/public.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiResponse({
    status: 201,
    description: 'User created'
  })
  @Public()
  @Post('signup')
  async create(@Body() CreateUserDto: CreateUserDto) {
    const user = { ...CreateUserDto, id: undefined, suggestions: undefined, events: undefined, created_at: new Date(), updated_at: new Date() };
    await this.userService.create(user);

    const createdUser = await this.userService.findOneWithEmail(user.email);

    await this.userService.createFolder(createdUser.id)
  }

  @ApiParam({
    name: 'token',
    description: "Token received in the user's email"
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed'
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found'
  })
  @ApiOperation({
    summary: 'Public',
    description: 'Password recovery'
  })
  @Public()
  @Patch('change-password/:token')
  async changePassword(@Param('token') token: string, @Body('password') password: string) {
    await this.userService.changePassword(token, password)
  }

  @ApiResponse({
    status: 200,
    description: 'list all users'
  })
  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @ApiParam({
    name: 'email',
    example: 'teste@teste.xyz'
  })
  @ApiResponse({
    status: 200,
    description: 'Get user by email'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @ApiParam({
    name: 'id',
    description: 'User id'
  })
  @ApiResponse({
    status: 200,
    description: 'Get user by id'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @ApiParam({
    name: 'id',
    description: 'User ID'
  })
  @ApiResponse({
    status: 200,
    description: 'User uploaded'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }
}
