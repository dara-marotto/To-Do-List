import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { ShowTaskDto } from './dto/show-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = new TaskEntity();
    Object.assign(task, createTaskDto);
    await this.taskRepository.save(task);

    return {
      message: 'Task successfully created',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state)
    }
  }

  async showTasks() {
    const tasks = await this.taskRepository.find();
    return tasks.map(
      (task) => new ShowTaskDto(
        task.id, task.title, task.description, task.colorTag, task.state
      ));
  }

  async showOneTask(id: string) {
    const task = await this.taskRepository.findOneBy({ id: id });

    if(!task) throw new NotFoundException('task not found');

    return new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id: id });

    if(!task) throw new NotFoundException('task not found');

    Object.assign(task, updateTaskDto);
    this.taskRepository.save(task);
    return {
      message: 'Task successfully updated',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state)
    }
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
