import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './configuration';
import { CryptoConfigService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CRYPTO_PASSWORD: Joi.string().required(),
      }),
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
  ],
  providers: [CryptoConfigService, ConfigService],
  exports: [CryptoConfigService, ConfigService],
})
export class CryptoConfigModule {}
