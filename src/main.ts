import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '@core/providers/postgresql/prisma';
import { AppConfigService } from '@config/app';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  // Bind ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Shutdown prisma after close application
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const appConfig = app.get<AppConfigService>(AppConfigService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle(appConfig.name || 'NeBo')
    .setDescription(appConfig.description || 'Nest.js boilerplate')
    .setVersion(appConfig.version || '')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  return app;
}

// ------------------------------------------------

export let viteNodeApp;

if (process.env.NODE_ENV === 'production') {
  async function bootstrap() {
    const app = await createApp();

    // Set port
    const appConfig = app.get(AppConfigService);
    const port = appConfig.port;

    await app.listen(port);
  }

  bootstrap();
} else {
  viteNodeApp = createApp();
}
