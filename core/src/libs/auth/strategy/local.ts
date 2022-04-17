import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthServiceFactory } from '../service.interface';
import { LocalOptions } from '../types';

@Injectable()
export class LocalBaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly authService: AuthServiceFactory,
    protected readonly options: LocalOptions,
  ) {
    super({
      usernameField: options?.usernameField || 'email',
      passwordField: options?.passwordField || 'password',
    });
  }

  async validate(email: string, password: string);

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
