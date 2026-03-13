import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(

    new ValidationPipe({
      stopAtFirstError: false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(Number(process.env.API_PORT));
}

bootstrap();
