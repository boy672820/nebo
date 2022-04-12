import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LocalStrategy as _LocalStrategy } from '@libs/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(_LocalStrategy, 'local') {
  async validate(email: string, password: string): Promise<any> {
    const payload = super.validate(email, password);

    return payload;
  }
}
