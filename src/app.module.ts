import { Module } from '@nestjs/common';
import { CoreModule } from '@core';
import { AuthModule, UserModule } from '@app';
//
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, AuthModule, UserModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
