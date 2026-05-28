import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { IsUniqueEmail } from "../validators";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  constructor(
    name: string, 
    email: string, 
    password: string) {

    this.name = name;
    this.email = email;
    this.password = password;
  }
    @ApiProperty({
      description: 'The name of the user',
      example: 'John Doe',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      description: 'The email of the user',
      example: 'user@mail.com'
    })
    @IsEmail()
    @IsUniqueEmail({ message: 'This email already exist'})
    email: string;

    @ApiProperty({
      description: 'The password of the user',
      example: 'P@ssw0rd'
    })
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).{6,30}$/, {
    message:
      'The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 6 and 30 characters long.',
  })
    password: string;
}
