import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { IsUniqueEmail } from "../validators";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsUniqueEmail({ message: 'This email already exist'})
    email: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 6 and 30 characters long.',
  })
    password: string;
}
