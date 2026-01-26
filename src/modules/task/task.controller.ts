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
  findAll() {
    return this.taskService.showTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.showOneTask(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
