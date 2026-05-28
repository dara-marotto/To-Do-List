import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from '../services';
import { CreateUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos';
import { AuthGuard } from '../../auth/guards';
import { UserInterface } from '../interfaces';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async create(
    @Body() data: CreateUserDto
  ): Promise<{ message: string, user: UserInterface}> {

    return await this.userService.create(data);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
  @Get()
  async index(): Promise<UserInterface | UserInterface[]> {

    return await this.userService.index();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<{ message: string }> {

    return await this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string
  ): Promise<{ message: string, userId: string}> {

    return await this.userService.delete(id);
  }
}
