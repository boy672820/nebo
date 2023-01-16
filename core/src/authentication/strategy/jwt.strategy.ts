import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CryptoService } from '@utils';
import { JwtConfigService } from '@config';
import { CoreAuthService } from '../auth.service';
import type { JWTAuthPayload, JWTUserPayload } from '../auth.types';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfig: JwtConfigService,
    private readonly service: CoreAuthService,
    private readonly crypto: CryptoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JWTAuthPayload): Promise<JWTUserPayload | null> {
    if (!payload.sub || !payload.userId) {
      return null;
    }

    // 토큰 유효성 검사(subject 검사)
    if (this.crypto.decrypt(payload.sub) !== 'access') {
      return null;
    }

    // ---------------------------------------------------------------------

    const userId = BigInt(this.crypto.decrypt(payload.userId));
    const user = await this.service.user({ userId });

    if (!user) {
      return null;
    }

    return user;
  }
}
