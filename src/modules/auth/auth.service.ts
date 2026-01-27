import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface UserPayload {
  sub: string;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(email: string, passwordEntered: string) {
    const user = await this.userService.checkExistingEmail(email); 
    
    const authenticatedUser = await bcrypt.compare(
      passwordEntered, user.password
    );

    if (!authenticatedUser)
      throw new UnauthorizedException(
        'The email address or the password must be incorrect',
    );

    const payload: UserPayload = {
      sub: user.id,
      userName: user.name
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

}
