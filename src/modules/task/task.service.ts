import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}
  async createTask(createTaskDto: CreateTaskDto) {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    return await this.taskRepository.save(task);
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async deleteTask(id: string) {
    const user = await this.taskRepository.delete(id);

    if(!user) throw new NotFoundException('task not found');

    return {
      message: 'Task successfully deleted',
      taskId: id
    }
  }
}
