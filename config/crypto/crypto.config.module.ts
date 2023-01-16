import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import configuration from './crypto.configuration';
import { CryptoConfigService } from './crypto.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CRYPTO_PASSWORD: Joi.string().required(),
      }),
    }),
  ],
  providers: [CryptoConfigService, ConfigService],
  exports: [CryptoConfigService, ConfigService],
})
export class CryptoConfigModule {}
