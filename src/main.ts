import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
async function bootstrap() {
  const customValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      const customErrors = validationErrors.map((error) => {
        if (error.constraints) {
          return {
            field: error.property,
            errors: Object.values(error.constraints),
          };
        } else {
          return {
            field: error.property,
            errors: [`The ${error.property} field is not allowed to exist`],
          };
        }
      });
  
      return new BadRequestException({
        statusstatusCode: 400,
        message: 'Invalid data',
        errors: customErrors,
      });
    },
  });

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(customValidationPipe)
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,{
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3001);
}
bootstrap();
