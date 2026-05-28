import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, Query, Put } from '@nestjs/common';
import { TaskService } from '../services';
import { CreateTaskDto } from '../dto';
import { UpdateTaskDto } from '../dto';
import { AuthGuard } from '../../auth/guards';
import { RequestWithUser } from '../../auth/interfaces';
import { GetTasksFilterDto } from '../dto';
import { TaskInterface } from '../interfaces';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}


  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  async create(
    @Req() req: RequestWithUser,
    @Body() taskData: CreateTaskDto
  ): Promise<{ message: string, task: TaskInterface}> {

    const userId = req.user.sub;
    return await this.taskService.create(userId, taskData);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks retrieved successfully.' })
  async getUserTasks(
    @Query() filterDto: GetTasksFilterDto,
    @Req() req: RequestWithUser
  ): Promise<TaskInterface[]> {

    const userId = req.user.sub
    return await this.taskService.get(userId, filterDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<{ message: string }> {

    const userId = req.user.sub;
    return await this.taskService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ): Promise<{ message: string, taskId: string}> {

    const userId = req.user.sub;
    return await this.taskService.delete(userId, id);
  }
}
