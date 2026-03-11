import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../user/services/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { COLOR_TAG as COLOR_TAG } from '../enums/color-tag.enum';
import { STATE_TAG as STATE_TAG } from '../enums/state-tag.enum';
import { TaskInterface } from '../interfaces/task.interface.ts';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}
  
  private readonly CACHE_KEY = 'user_tasks';

  private async getOneTask(
    userId: string, 
    id: string
  ): Promise<TaskEntity> {
    
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
    });

    if(!task) throw new NotFoundException('Task not found.')
    return task;
  }

  async create(
    userId: string, 
    taskData: CreateTaskDto
  ): Promise<{ message: string, task: TaskInterface}> {

    const user = await this.userService.show(userId)
    
    if (!user) {
      throw new NotFoundException('User from token not found');
    }
    const task = this.taskRepository.create({
      ...taskData,
      user: { id: userId },
    });

    await Promise.all([
      this.taskRepository.save(task),
      this.cacheManager.del(this.CACHE_KEY),
    ]);

    return {
      message: 'Task successfully created',
      task
    }
  }
  
  async get(
    userId: string,
    filters: GetTasksFilterDto
  ): Promise<TaskInterface[]> {

    const cacheKey = `${this.CACHE_KEY}:${userId}:${JSON.stringify(filters)}`;

    const tasksInCache: TaskInterface[] | undefined = await this.cacheManager.get(cacheKey);
    if(tasksInCache) return tasksInCache;

    const { state, colorTag } = filters;

    const query: FindOptionsWhere<TaskEntity> = {
      user: { id: userId },
    }
    
    if(colorTag) query.colorTag = colorTag as COLOR_TAG;
    if(state) query.state = state as STATE_TAG;

    const tasks = await this.taskRepository.find({
      select: {
        id: true,
        title: true,
        description: true,
        colorTag: true,
        state: true,
        active: true
      },
      where: query,
    });

    await this.cacheManager.set(cacheKey, tasks);
    return tasks as TaskInterface[];
  }

  async update(
    userId: string, 
    id: string, 
    dtoUpdate: UpdateTaskDto
  ): Promise<{ message: string, task: TaskInterface}> {

    const task = await this.getOneTask(userId, id);
    if(!task) throw new NotFoundException('task not found');

    Promise.all([
      this.taskRepository.update(task.id, dtoUpdate),
      this.cacheManager.del(this.CACHE_KEY),
    ]);

    return {
      message: 'Task successfully updated',
      task
    }
  }

  async delete(
    userId: string,
     id: string
    ): Promise<{ message: string, taskId: string }> {

    const task = await this.getOneTask(userId, id);
    if(!task) throw new NotFoundException('task not found');

    await Promise.all([
      await this.taskRepository.delete(task.id),
      await this.cacheManager.del(this.CACHE_KEY),
    ]);

    return {
      message: 'Task successfully deleted',
      taskId: id
    }
  }
}
