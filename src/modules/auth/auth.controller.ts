import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignInDto } from './dto/signin-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() user_data: SignInDto) {
    return this.authService.signIn(user_data.email, user_data.password)
  }

  @Get('user')
  getProfile(@Request() req) {
    return this.authService.getUser(req);
  }
}
