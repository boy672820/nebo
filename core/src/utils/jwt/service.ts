import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: _JwtService) {}

  verify(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  create(payload, options?: JwtSignOptions) {
    // const string = JSON.stringify(payload);
    // const sub = this.cryptoService.encrypt(string);

    // const jwt = this.jwtService.sign({ sub }, options || {});
    const jwt = this.jwtService.sign(payload, options);

    return jwt;
  }
}
