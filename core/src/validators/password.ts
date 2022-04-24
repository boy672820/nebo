import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { InvalidPasswordException } from '@core/errors/user';

@ValidatorConstraint()
@Injectable()
class Constraint implements ValidatorConstraintInterface {
  async validate(text: string) {
    const regex = /(?=.*\d)(?=.*[a-z]).{8,}/;

    if (!regex.test(text)) {
      throw new InvalidPasswordException();
    }

    return true;
  }
}

export function IsPassword() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: Constraint,
    });
  };
}
