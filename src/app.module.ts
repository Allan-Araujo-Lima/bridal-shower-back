import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SugestionsModule } from './modules/sugestions/sugestions.module';
import { DatabaseModule } from './config/database.module';
import * as Joi from 'joi';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        FRONTEND_URL: Joi.string(),
      }),
    }),
    SugestionsModule,
    UserModule,
    AuthModule,
    StripeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    MailerModule.forRoot({
      transport: 'smtp://sandbox-smtp.mailcatch.app:2525',
      defaults: {
        host: "sandbox-smtp.mailcatch.app",
        port: 2525,
        auth: {
          user: "362ae93fd864",
          pass: "098fc27ef2cc",
        }
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class AppModule { }
