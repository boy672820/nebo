import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        expiration: Joi.string().required(),
        secret: Joi.string().required(),
      }),
    }),
  ],
})
export class JwtConfigModule {}
