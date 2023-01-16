import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LocalBaseStrategy, AuthResult } from '@libs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  LocalBaseStrategy,
  'local',
) {
  constructor(protected readonly authService: AuthService) {
    super(authService);
  }

  async validate(email: string, password: string): Promise<AuthResult> {
    const payload = await super.validate(email, password);

    return payload;
  }
}
