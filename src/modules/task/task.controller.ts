import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard, RequestWithUser } from '../auth/auth.guard';

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
    
    return await this.taskService.createTask(userId, taskData);
  }

  @Get()
  showUserTasks(@Req() req: RequestWithUser) {
    const userId = req.user.sub
    return this.taskService.showUserTasks(userId);
  }

  @Patch(':id')
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    const userId = req.user.sub;
    return this.taskService.updateTask(userId, id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ) {
    const userId = req.user.sub;
    return this.taskService.deleteTask(userId, id);
  }
}
