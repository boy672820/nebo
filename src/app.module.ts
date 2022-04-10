import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module';
import { AuthModule } from './auth/module';

@Module({
  imports: [AppConfigModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
