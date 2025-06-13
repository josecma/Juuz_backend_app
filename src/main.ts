import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // Retain raw request body for Stripe webhook verification
    cors: true,
  });


  // // Configura bodyParser específicamente para JSON
  // app.use(bodyParser.json({ limit: '50mb' }));

  // // Configuración especial para FormData
  // app.use(bodyParser.urlencoded({
  //   extended: true,
  //   limit: '50mb',
  //   parameterLimit: 10000,
  // }));


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transformar automáticamente los payloads a instancias de DTO
      whitelist: true, // Eliminar propiedades desconocidas de los payloads
      forbidNonWhitelisted: true, // Lanazar error si se encuentran propiedades desconocidas en los payloads
      validationError: { target: false }, // Enviar errores de validación como una respuesta HTTP JSON
    })
  );

  const config = new DocumentBuilder()
    .setTitle('JUUZ')
    .setDescription('The best transportation in the world')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
