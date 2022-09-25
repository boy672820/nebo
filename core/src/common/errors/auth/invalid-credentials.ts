import { UnauthorizedException } from '@nestjs/common';
import { INVALID_CREDENTIALS } from './constants';

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(INVALID_CREDENTIALS);
  }
}
