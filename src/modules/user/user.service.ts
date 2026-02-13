import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowUsersDTO } from './dto/show-users.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
    constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private readonly CACHE_KEY = 'users';

  async findUserById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

    async checkExistingEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });

    if(!user) {
      throw new UnauthorizedException('The email address or the password must be incorrect')
    }
    return user;
  }

  async findEmail(email: string): Promise<boolean> {
    const possibleUser = await this.userRepository.findOne({
      where: { email },
    });
    return possibleUser !== null; 
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new UserEntity;
    Object.assign(user, createUserDto);
    await this.cacheManager.del(this.CACHE_KEY);

    return this.userRepository.save(user);
  }

  async showUsers() {
    const cacheKey = this.CACHE_KEY;

    const usersInCache: ShowUsersDTO | undefined = await this.cacheManager.get(cacheKey);
    if(usersInCache) return usersInCache;

    const savedUsers = await this.userRepository.find(); 
    const usersList = savedUsers.map(user => new ShowUsersDTO(user.id, user.name, user.email));

    await this.cacheManager.set(cacheKey, usersList);
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
