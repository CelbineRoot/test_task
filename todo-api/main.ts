import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {HttpCatchAllFilter} from "./modules/errors";
import {appConfig} from "./modules/config/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const isProd = config.environment === 'production';

  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  });

  app.useLogger(
      isProd ? ['error', 'warn'] : ['log', 'debug', 'error', 'verbose', 'warn'],
  );

  app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: isProd,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
  );

  app.useGlobalFilters(new HttpCatchAllFilter());

  const swagger = new DocumentBuilder()
      .setTitle('TODO API')
      .setDescription(
          'Апи для списка задач',
      )
      .addBearerAuth()
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('870c66c1-64e0-418f-9d78-57c38739dd23/documentation', app, document);

  await app.listen(config.port);
}
bootstrap();
