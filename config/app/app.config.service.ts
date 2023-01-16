import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `app.${key}`;

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>(prefix('port')));
  }

  get env(): string {
    return this.configService.get<string>(prefix('env'));
  }

  get name(): string {
    return this.configService.get<string>(prefix('name'));
  }

  get description(): string {
    return this.configService.get<string>(prefix('description'));
  }

  get version(): string {
    return this.configService.get<string>(prefix('version'));
  }
}
