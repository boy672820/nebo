import { BadRequestException } from '@nestjs/common';

export class InvalidPasswordException extends BadRequestException {
  constructor() {
    super('INVALID_PASSWORD');
  }
}
