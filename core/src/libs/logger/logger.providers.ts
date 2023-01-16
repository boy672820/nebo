import * as winston from 'winston';
import { utilities } from 'nest-winston';
import { AppConfigService } from '@config/app';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export const provider = {
  provide: 'LOGGER',
  inject: [AppConfigService],
  useFactory: (appConfig: AppConfigService) => {
    const logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint(),
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error-${new Date().toISOString()}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(
            utilities.format.nestLike(appConfig.name, { prettyPrint: true }),
          ),
        }),
      ],
    });

    return logger;
  },
};
