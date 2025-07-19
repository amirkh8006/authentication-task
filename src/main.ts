import * as dotenv from 'dotenv';

const envPath = process.cwd() + '/.env.' + process.env.NODE_ENV;
dotenv.config({ path: envPath });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('The Authentication App API Description')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory, {
    swaggerOptions: {
      supportedSubmitMethods: [],
    },
    jsonDocumentUrl: '/api-doc-json',
  });

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: () => {
        return new BadRequestException('Invalid Data Provided');
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
