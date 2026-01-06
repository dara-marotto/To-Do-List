import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface 
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const userWithEmailExistis = await this.userService.findEmail(value);
    return !userWithEmailExistis;
  }
}

export const IsUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};