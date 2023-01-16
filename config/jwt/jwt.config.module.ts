import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './jwt.configuration';
import { JwtConfigService } from './jwt.config.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [JwtConfigService, ConfigService],
  exports: [JwtConfigService, ConfigService],
})
export class JwtConfigModule {}
