import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos';
import { UserEntity } from '../entities';
import { UserInterface } from '../interfaces';

@Injectable()
export class UserService {
    constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private readonly CACHE_KEY = 'users';

    async checkExistingEmail
    (email: string
    ): Promise<UserEntity> {

    const user = await this.userRepository.findOneBy({ email: email });

    if(!user) {
      throw new UnauthorizedException('The email address or the password must be incorrect')
    }

    return user;
  }

  async findEmail(
    email: string
  ): Promise<boolean> {

    const possibleUser = await this.userRepository.findOne({
      where: { email },
    });
    return possibleUser !== null; 
  }

  async show(
    userId: string
  ): Promise<UserEntity> {

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(
    dto: CreateUserDto
  ): Promise<{ message: string, user: UserInterface }> {
    
    const user = new UserEntity;
    
    dto.password = await bcrypt.hash(dto.password, Number(process.env.SALT_PASSWORD));
    
    Object.assign(user, dto);
    
    Promise.all([
      this.cacheManager.del(this.CACHE_KEY),
      this.userRepository.save(user),
    ]);
    return {
      message: 'user successfully created',
      user
    }
  }

  async index(): Promise<UserInterface[]> {

    const cacheKey = this.CACHE_KEY;

    const usersInCache: UserInterface[] | undefined = await this.cacheManager.get(cacheKey);
    if(usersInCache) return usersInCache;

    const savedUsers = await this.userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    }); 

    await this.cacheManager.set(cacheKey, savedUsers);
    return savedUsers;
  }

  async update(
    id: string, 
    dtoUpdate: UpdateUserDto
  ): Promise<{ message: string }> {

    const user = await this.userRepository.findOneBy({ id: id });

    if(!user) throw new NotFoundException('user not found');

    if(dtoUpdate.password) dtoUpdate.password = await bcrypt.hash(dtoUpdate.password, 10);
    
    Promise.all([
      this.userRepository.update(user.id, dtoUpdate),
      this.cacheManager.del(this.CACHE_KEY),
    ]);

    return {
      message: 'User succesfully updated'
    }
  }

  async delete(
    id: string
  ): Promise<{ message: string, userId: string }> {

    const user = await this.userRepository.delete(id);

    if(!user) throw new NotFoundException('user not found');

    await this.cacheManager.del(this.CACHE_KEY);

    return {
      message: 'User succesfully deleted',
      userId: id
    };
    }
}
