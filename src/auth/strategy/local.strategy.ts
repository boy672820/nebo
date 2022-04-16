import { Injectable } from '@nestjs/common';
import { LocalStrategy as _LocalStrategy } from '@libs/auth';
import { User } from '@prisma/client';
import { AuthService } from '../service';

@Injectable()
export class LocalStrategy extends _LocalStrategy {
  constructor(protected readonly authService: AuthService) {
    super(authService);
  }

  async validate(email: string, password: string): Promise<User> {
    const payload = await super.validate(email, password);

    return payload;
  }
}
