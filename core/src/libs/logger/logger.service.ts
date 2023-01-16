import {
  Inject,
  Injectable,
  LoggerService as NestLoggerService,
} from '@nestjs/common';
import { AppConfigService } from '@config';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject('LOGGER') private readonly logger: Logger,
    private readonly appConfig: AppConfigService,
  ) {}

  log(message: string) {
    this.logger.debug(message);
  }

  error(message: string, stack?: string, service?: string) {
    if (this.appConfig.env === 'development') {
      this.logger.error(message, { stack, service });
    }
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
