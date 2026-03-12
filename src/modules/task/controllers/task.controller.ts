import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, Query, Put } from '@nestjs/common';
import { TaskService } from '../services';
import { CreateTaskDto } from '../dto';
import { UpdateTaskDto } from '../dto';
import { AuthGuard, RequestWithUser } from '../../auth/guards';
import { GetTasksFilterDto } from '../dto';
import { TaskInterface } from '../interfaces';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() taskData: CreateTaskDto
  ): Promise<{ message: string, task: TaskInterface}> {

    const userId = req.user.sub;
    return await this.taskService.create(userId, taskData);
  }

  @Get()
  async getUserTasks(
    @Query() filterDto: GetTasksFilterDto,
    @Req() req: RequestWithUser
  ): Promise<TaskInterface[]> {

    const userId = req.user.sub
    return await this.taskService.get(userId, filterDto);
  }

  @Put(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<{ message: string }> {

    const userId = req.user.sub;
    return await this.taskService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ): Promise<{ message: string, taskId: string}> {

    const userId = req.user.sub;
    return await this.taskService.delete(userId, id);
  }
}
