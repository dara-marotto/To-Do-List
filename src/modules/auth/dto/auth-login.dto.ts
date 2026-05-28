import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthLoginDto {
  @ApiProperty({
    example: 'dara.marotto@mail.com',
    description: 'The email of the user'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'The password of the user'
  })
  @IsNotEmpty()
  password: string;
}
