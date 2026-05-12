// Load environment variables from the repository root .env before anything else.
// This ensures Prisma (and other libraries) can read DATABASE_URL at runtime.
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function parseCorsOrigins() {
  const configuredOrigins = process.env.CORS_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins?.length
    ? configuredOrigins
    : [
        'https://deldot-dmv-ccm-tool.firebaseapp.com',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
      ];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  app.enableCors({
    origin: parseCorsOrigins(),
    credentials: true,
  });
  await app.listen(port, host);
}

void bootstrap();
