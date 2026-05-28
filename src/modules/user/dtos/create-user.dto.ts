import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { IsUniqueEmail } from "../validators";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
      example: 'Dara Marotto',
      description: 'The name of the user'
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      example: 'dara.marotto@mail.com',
      description: 'The email of the user'
    })
    @IsEmail()
    @IsUniqueEmail({ message: 'This email already exist'})
    email: string;

    @ApiProperty({
      example: 'P@ssw0rd',
      description: 'The password of the user. It must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 6 and 30 characters long.'
    })
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 6 and 30 characters long.',
  })
    password: string;
}
