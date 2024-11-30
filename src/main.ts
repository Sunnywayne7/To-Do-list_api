import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { RootModule } from './root/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000);
}
bootstrap();
