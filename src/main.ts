import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // Разрешить доступ со всех источников
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешить все HTTP-методы
    allowedHeaders: '*', // Разрешить все заголовки
  });
  await app.listen(3000);
}
bootstrap();
