import { Module } from '@nestjs/common';
import { CoreModule } from '@core/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/module';
import { UserModule } from './user/module';

@Module({
  imports: [CoreModule, AuthModule, UserModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
