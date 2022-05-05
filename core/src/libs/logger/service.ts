import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject('LOGGER') private readonly logger: Logger) {}

  log(message: string) {
    this.logger.debug(message);
  }

  error(message: string, trace?: string, service?: string) {
    this.logger.error(message, { stack: trace, service });
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
