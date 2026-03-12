import { 
  registerDecorator, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface 
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { UserService } from "../services";

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly userService: UserService
  ) {}

  async validate(
    value: string,
  ): Promise<boolean> {
    const user = await this.userService.findEmail(value);
    return !user;
  }
}

export const IsUniqueEmail = (validationOptions: ValidationOptions) => {
  return (object: Object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};