import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@providers/postgresql';
import { AppConfigService } from '../config/app';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  return app;
}

// ------------------------------------------------

async function bootstrap() {
  const app = await createApp();

  const appConfig = app.get(AppConfigService);
  const port = appConfig.port;

  await app.listen(port);
}

// ------------------------------------------------

export let viteNodeApp;

if (process.env.NODE_ENV === 'production') {
  bootstrap();
} else {
  viteNodeApp = NestFactory.create(AppModule);
}
