import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, Query, Put } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AuthGuard, RequestWithUser } from '../../auth/guards/auth.guard';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() taskData: CreateTaskDto
  ) {
    const userId = req.user.sub;
    return await this.taskService.create(userId, taskData);
  }

  @Get()
  async getUserTasks(
    @Query() filterDto: GetTasksFilterDto,
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.sub
    return await this.taskService.get(userId, filterDto);
  }

  @Put(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    const userId = req.user.sub;
    return await this.taskService.update(userId, id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ) {
    const userId = req.user.sub;
    return await this.taskService.delete(userId, id);
  }
}
