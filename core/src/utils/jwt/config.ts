import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { JwtConfigService as _JwtConfigService } from '@config/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly jwtConfig: _JwtConfigService) {
    const secret = this.jwtConfig.secret;
    const expiration = this.jwtConfig.expiration;

    this.secret = secret;
    this.expiration = expiration;
  }

  private readonly secret: string;
  private readonly expiration: string;

  createJwtOptions() {
    return {
      secret: this.secret,
      verifyOptions: { maxAge: this.expiration },
    };
  }
}
