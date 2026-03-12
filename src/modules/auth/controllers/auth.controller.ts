import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from '../services'
import { AuthLoginDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: AuthLoginDto
  ): Promise<{ access_token: string }> {
    
    return await this.authService.login(email, password);
  }
}
