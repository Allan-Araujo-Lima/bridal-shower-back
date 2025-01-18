import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SugestionsModule } from './modules/sugestions/sugestions.module';
import { DatabaseModule } from './config/database.module';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        FRONTEND_URL: Joi.string(),
      }),
    }),
    SugestionsModule,
    UserModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    })
  ],
})
export class AppModule { }
