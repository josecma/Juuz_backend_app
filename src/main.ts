import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true, // Retain raw request body for Stripe webhook verification
    cors: true,
  });
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
