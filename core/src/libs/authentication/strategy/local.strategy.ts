import { PassportStrategy } from '@nestjs/passport';
import type {
  AuthServiceFactory,
  LocalOptions,
  AuthResult,
} from '@libs/authentication';
import { InvalidCredentialsException } from '@core/common/errors/auth';
import { Strategy } from 'passport-local';

export class LocalBaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly service: AuthServiceFactory,
    protected readonly options: LocalOptions,
  ) {
    super({
      usernameField: options?.usernameField || 'email',
      passwordField: options?.passwordField || 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthResult>;

  async validate(email: string, password: string): Promise<AuthResult> {
    const user = await this.service.validateUser(email, password);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
