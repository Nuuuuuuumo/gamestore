import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTrimmedNotEmpty', async: false })
export class IsTrimmedNotEmpty implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    if (typeof value !== 'string') {
      return false;
    }
    return value.trim() !== '';
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be not empty`;
  }
}
