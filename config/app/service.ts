import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (env: string) => `app.${env}`;

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>(prefix('port')));
  }

  get env(): string {
    return this.configService.get<string>(prefix('env'));
  }
}
