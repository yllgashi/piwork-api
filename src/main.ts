import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GeneralExceptionFilter } from './shared/filters/general-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // manage exceptions for all aplliaction errors
  app.useGlobalFilters(new GeneralExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Piwork-api')
    .setDescription('API documentation for pi-work application')
    .setVersion('1.0')
    .addTag('Home')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
