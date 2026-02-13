import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowTaskDto } from './dto/show-task.dto';
import { UserService } from '../user/user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { COLOR_TAG as COLOR_TAG } from './enums/color-tag.enum';
import { STATE_TAG as STATE_TAG } from './enums/state-tag.enum';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}
  
  private readonly CACHE_KEY = 'user_tasks';

  private async getOneUserTask(userId: string, id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user: { id: userId },
      },
      relations: {
        user: true
      },
    });
    return task;
  }

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
    await this.cacheManager.del(this.CACHE_KEY);

    return {
      message: 'Task successfully created',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state, task.active)
    }
  }
  
  async showUserTasks(
    userId: string,
    filters: GetTasksFilterDto
  ): Promise<ShowTaskDto[]> {

    const cacheKey = `${this.CACHE_KEY}:${userId}:${JSON.stringify(filters)}`;

    const tasksInCache: ShowTaskDto[] | undefined = await this.cacheManager.get(cacheKey);
    if(tasksInCache) return tasksInCache;

    const { state, colorTag } = filters;

    const query: FindOptionsWhere<TaskEntity> = {
      user: { id: userId },
    }
    
    if(colorTag) query.colorTag = colorTag as COLOR_TAG;
    if(state) query.state = state as STATE_TAG;

    const tasks = await this.taskRepository.find({
      where: query,
      relations: {
        user: true,
      },
    });

    const convertedTasks: ShowTaskDto[] = tasks.map(
     (task) => new ShowTaskDto(
       task.id, task.title, task.description, task.colorTag, task.state, task.active
     ));
        
    await this.cacheManager.set(this.CACHE_KEY, convertedTasks);
    return convertedTasks;
  }

  async updateTask(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.getOneUserTask(userId, id);
    if(!task) throw new NotFoundException('task not found');

    Object.assign(task, updateTaskDto);
    this.taskRepository.save(task);
    return {
      message: 'Task successfully updated',
      task: new ShowTaskDto(task.id, task.title, task.description, task.colorTag, task.state, task.active)
    }
  }

  async deleteTask(userId: string, id: string) {
    const task = await this.getOneUserTask(userId, id);
    if(!task) throw new NotFoundException('task not found');

    await this.taskRepository.delete(task.id);

    return {
      message: 'Task successfully deleted',
      taskId: id
    }
  }

}
