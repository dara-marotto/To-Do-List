import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { UserInterface } from '../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() data: CreateUserDto
  ): Promise<{ message: string, user: UserInterface}> {

    return await this.userService.create(data);
  }

  @Get()
  async index(): Promise<UserInterface | UserInterface[]> {

    return await this.userService.index();
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<{ message: string, user: UserInterface}> {

    return await this.userService.update(id, updateUserDto);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string
  ): Promise<{ message: string, userId: string}> {

    return await this.userService.delete(id);
  }
}
