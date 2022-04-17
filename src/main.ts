import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '@core/providers/postgresql/prisma';
import { AppConfigService } from '@config/app';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function createApp() {
  const app = await NestFactory.create(AppModule);

  // Bind ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Shutdown prisma after close application
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME || 'NeBo')
    .setDescription(process.env.APP_DESCRIPTION || 'Nest.js boilerplate')
    .setVersion(process.env.APP_VERSION || '')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  return app;
}

// ------------------------------------------------

async function bootstrap() {
  const app = await createApp();

  // Set port
  const appConfig = app.get(AppConfigService);
  const port = appConfig.port;

  await app.listen(port);

  // HMR
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
