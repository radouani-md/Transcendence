import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), 'marketplace-upload'), {
    prefix: '/marketplace-upload/',
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
