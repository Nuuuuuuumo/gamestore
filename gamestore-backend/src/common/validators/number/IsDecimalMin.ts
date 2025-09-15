import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDecimalMin', async: false })
export class IsMinValue implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (typeof Number(value) != 'number') {
      return false;
    } else {
      return Number(value) >= 0;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be less than 0`;
  }
}

@ValidatorConstraint({ name: 'isDecimalMax', async: false })
export class IsMaxValue implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (typeof Number(value) != 'number') {
      return false;
    } else {
      return Number(value) <= 10.0;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must not be bigger than 10`;
  }
}
