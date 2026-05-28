import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services'
import { AuthLoginDto } from '../dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return an access token' })
  async login(
    @Body() { email, password }: AuthLoginDto
  ): Promise<{ access_token: string }> {
    
    return await this.authService.login(email, password);
  }
}
