import { BadRequestException } from '@nestjs/common';
import { ALREADY_EXISTS_EMAIL } from './constants';

export class AlreadyExistsEmailException extends BadRequestException {
  constructor() {
    super(ALREADY_EXISTS_EMAIL);
  }
}
