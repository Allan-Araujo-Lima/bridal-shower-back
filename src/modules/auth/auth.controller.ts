import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignInDto } from './dto/signin-dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong password or email'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signin')
  signIn(@Body() user_data: SignInDto) {
    return this.authService.signIn(user_data.email, user_data.password)
  }

  @ApiParam({
    name: 'email',
    description: 'Email that forgot password url must to be sended',
    example: "example@xyz.com"
  })
  @ApiResponse({
    status: 200,
    description: "Password changed successfuly"
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  @Public()
  @Post('forgot-password/:email')
  async sendEmailForgotPassword(@Param() email): Promise<void> {
    return this.authService.sendEmailForgotPassword(email.email)
  }

  @ApiResponse({
    status: 200,
    description: 'Users taken',
  })
  @Get('user')
  getProfile(@Request() req) {
    return this.authService.getUser(req);
  }
}

