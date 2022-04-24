import { BadRequestException } from '@nestjs/common';
import { INVALID_PASSWORD } from './constants';

export class InvalidPasswordException extends BadRequestException {
  constructor() {
    super(INVALID_PASSWORD);
  }
}
