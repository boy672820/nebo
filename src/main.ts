import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@providers/postgresql';
import { AppConfigService } from '../config/app';

declare const module: any;

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

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

// ------------------------------------------------

export let viteNodeApp;

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
} else {
  viteNodeApp = createApp();
}
