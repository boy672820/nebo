import { Injectable } from '@nestjs/common';
import { LocalBaseStrategy } from '@libs/auth';
import { User } from '@prisma/client';
import { AuthService } from '../service';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  LocalBaseStrategy,
  'local',
) {
  constructor(protected readonly authService: AuthService) {
    super(authService);
  }

  async validate(email: string, password: string): Promise<User> {
    const payload = await super.validate(email, password);

    return payload;
  }
}
