import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/user/entities/user.entity';

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

  async login(
    email: string, 
    password: string
  ): Promise<{ access_token: string}> {
    
    const user = await this.validateUser(email, password);

    if (!user)
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

  private async validateUser(email, password): Promise<UserEntity | false> {

    const user = await this.userService.checkExistingEmail(email); 

    if(!user) throw new NotFoundException('User not found');

    const authenticatedUser = await bcrypt.compare(
      password, user.password
    );

    return authenticatedUser ? user : false;
  }

}
