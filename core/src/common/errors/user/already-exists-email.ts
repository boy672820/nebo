import { BadRequestException } from '@nestjs/common';

export class AlreadyExistsEmailException extends BadRequestException {
  constructor() {
    super('ALREADY_EXISTS_EMAIL');
  }
}
