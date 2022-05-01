import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
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
      ],
    });
  }

  log(message: string) {
    this.logger.info(message, 'test');
  }

  error(message: string, trace?: string, service?: string) {
    this.logger.error(message, { stack: trace, service });
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
