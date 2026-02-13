import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // app nest register
  const app = await NestFactory.create(AppModule); // อ่าน module ทั้งหมดจาก AppModule
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
