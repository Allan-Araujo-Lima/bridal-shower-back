// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(
    new HttpExceptionFilter()
  )
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
