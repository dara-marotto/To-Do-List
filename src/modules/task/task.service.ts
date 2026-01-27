import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { ShowTaskDto } from './dto/show-task.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async createTask(userId: string, taskData: CreateTaskDto) {
    const user = await this.userService.findUserById(userId)

  if (!user) {
    throw new NotFoundException('User from token not found');
  }
    const task = this.taskRepository.create({
      ...taskData,
      user: { id: userId },
    })
    await this.taskRepository.save(task);

    return {
      message: 'Task successfully created',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state)
    }
  }

  async showUserTasks(userId: string) {
    const tasks = await this.taskRepository.find({
      where: {
        user: { id: userId }
      },
      relations: {
        user: true,
      },
    });
    return tasks.map(
      (task) => new ShowTaskDto(
        task.id, task.title, task.description, task.colorTag, task.state
      ));
  }

  async updateTask(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
      relations: {
        user: true
      },
    })

    if(!task) throw new NotFoundException('task not found');

    Object.assign(task, updateTaskDto);
    this.taskRepository.save(task);
    return {
      message: 'Task successfully updated',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state)
    }
  }

  async deleteTask(userId: string, id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
      relations: {
        user: true
      }
    })
    if(!task) throw new NotFoundException('task not found');

    await this.taskRepository.delete(task.id);

    return {
      message: 'Task successfully deleted',
      taskId: id
    }
  }
}
