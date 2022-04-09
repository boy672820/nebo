import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from '@providers/postgresql/service';
import { AppConfigService } from '../config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const appConfig = app.get(AppConfigService);
  const port = appConfig.port;

  await app.listen(port);
}
bootstrap();
