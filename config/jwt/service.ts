import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const prefix = (key: string) => `jwt.${key}`;

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get expiration(): string {
    return this.configService.get<string>(prefix('expiration'));
  }

  get secret(): string {
    return this.configService.get<string>(prefix('secret'));
  }
}
