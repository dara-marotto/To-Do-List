import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos';
import { AuthGuard } from '../../auth/guards';
import { UserInterface } from '../interfaces';

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
  ): Promise<{ message: string }> {

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
