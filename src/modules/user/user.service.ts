import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowUsersDTO } from './dto/show-users.dto';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findEmail(email: string): Promise<boolean> {
    const possibleUser = await this.userRepository.findOne({
      where: { email },
    });
    return possibleUser !== null; 
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new UserEntity;
    Object.assign(user, createUserDto);
    return this.userRepository.save(user);
  }

  async showUsers() {
    const savedUsers = await this.userRepository.find(); 
    const usersList = savedUsers.map(user => new ShowUsersDTO(user.id, user.name, user.email));
    return usersList;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id: id })
    
    if(!user) throw new NotFoundException('user not found');
    
    return new ShowUsersDTO(user.id, user.name, user.email);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });

    if(!user) throw new NotFoundException('user not found');

    Object.assign(user, updateUserDto);
    this.userRepository.save(user);
    return {
      message: 'User succesfully updated',
      user: new ShowUsersDTO(user.id, user.name, user.email),
    }

  }

  async deleteUser(id: string) {
    const user = await this.userRepository.delete(id);

    if(!user) throw new NotFoundException('user not found');

    return {
      message: 'User succesfully deleted',
      userId: id
    };
    }
}
