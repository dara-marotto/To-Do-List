import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './services';
import { TaskController } from './controllers';
import { TaskEntity } from './entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([TaskEntity])
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
