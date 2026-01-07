import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(password: string): Promise<string> {
    const saltRoundsStr = this.configService.get<string>('SALT_PASSWORD');
    if (!saltRoundsStr) throw new Error('SALT_PASSWORD is not configured');

    const saltRounds = Number(saltRoundsStr);

    if(Number.isNaN(saltRounds)) throw new Error('SALT_PASSWORD must be a number');

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}