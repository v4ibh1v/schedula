import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { RoutesResolver } from '@nestjs/core/router/routes-resolver';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // ✅ Log available routes via NestJS internal metadata
  const server = app.getHttpServer();
  const router = app.getHttpAdapter();
  const rawRoutes = app['_container']?.getModules()?.get(AppModule)?.routes;

  Logger.log('Server started on http://localhost:3000 🚀');

  if (rawRoutes) {
    Logger.log('📌 Registered route controllers:');
    rawRoutes.forEach((route) => {
      Logger.log(`- ${route.name}`);
    });
  } else {
    Logger.warn('❌ Could not fetch route metadata');
  }
}
bootstrap();
