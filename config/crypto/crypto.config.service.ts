import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `crypto.${key}`;

@Injectable()
export class CryptoConfigService {
  constructor(private readonly configService: ConfigService) {}

  get password(): string {
    return this.configService.get<string>(prefix('password'));
  }
}
