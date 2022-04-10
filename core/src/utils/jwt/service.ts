import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CryptoService } from '@utils/crypto';

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: _JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  verify(jwt: string) {
    const verified = this.jwtService.verify(jwt);

    return verified;
  }

  create(payload, options?: JwtSignOptions) {
    const string = JSON.stringify(payload);
    const sub = this.cryptoService.encrypt(string);

    const jwt = this.jwtService.sign({ sub }, options);

    return jwt;
  }
}
