import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services';
import { UserController } from './controllers';
import { UserEntity } from './entities';
import { UniqueEmailValidator } from './validators';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator],
  exports: [UserService]
})
export class UserModule {}
