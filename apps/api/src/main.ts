// Load environment variables from the repository root .env before anything else.
// This ensures Prisma (and other libraries) can read DATABASE_URL at runtime.
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST;
  app.enableCors({
    origin: ['https://deldot3.saakethp.workers.dev','https://deldot-team3.onrender.com','http://localhost:3000', 'http://localhost:3001', process.env.VITE_BACKEND_URL],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(port, '0.0.0.0');
}

void bootstrap();
