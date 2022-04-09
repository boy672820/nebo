import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return Number(this.configService.get<number>('APP_PORT'));
  }

  get env(): string {
    return this.configService.get<string>('APP_ENV');
  }
}
