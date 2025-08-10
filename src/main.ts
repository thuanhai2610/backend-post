import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FE,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe())
  app.use(express.json())
  app.useGlobalInterceptors();
  app.use(express.urlencoded({extended: true}))
  await app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
