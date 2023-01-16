import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { JwtConfigService as JwtConfig } from '@config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly jwtConfig: JwtConfig) {}

  createJwtOptions() {
    return {
      secret: this.jwtConfig.secret,
      signOptions: { expiresIn: this.jwtConfig.expiration },
    };
  }
}
