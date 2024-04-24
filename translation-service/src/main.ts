import { NestFactory } from '@nestjs/core';
import { TranslatorModule } from './translator/translator.module';

async function bootstrap() {
  const app = await NestFactory.create(TranslatorModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with the allowed origin(s) for CORS
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
