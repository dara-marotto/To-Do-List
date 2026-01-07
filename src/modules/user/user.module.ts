import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UniqueEmailValidator } from './validators/is-unique-email.validator';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UniqueEmailValidator, HashPasswordPipe],
  exports: [UserService]
})
export class UserModule {}
