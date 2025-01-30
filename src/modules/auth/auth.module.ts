import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: String(process.env.SECRET_KEY),
      signOptions: { expiresIn: '28000s' }
    })
  ],
  providers: [
    EmailService,
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
