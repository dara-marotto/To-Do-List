import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('To-Do List API')
    .addBearerAuth()
    .setDescription('API for managing to-do lists and tasks')
    .setVersion('1.0')
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory(), {
      swaggerOptions: {
        persistAuthorization: true,
      }
    });

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
