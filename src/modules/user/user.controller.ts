import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';
import { ShowUsersDTO } from './dto/show-users.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() { password, ...userData }: CreateUserDto,
    @Body('password', HashPasswordPipe) hashedPassword: string
  ) {

    const newUser = await this.userService.createUser({
      ...userData,
      password: hashedPassword
    });
    
    return {
      message: 'user successfully created',
      user: new ShowUsersDTO(newUser.id, newUser.name, newUser.email)
    }
  }

  @Get()
  async showUsers() {
    const users = await this.userService.showUsers();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
