import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto, now: string) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      lastLogin: now,
      createAt: now,
      updateAt: now,
      userExpirationDate: now,
      passwordExpirationDate: now,
    });

    return await this.usersRepository.save(newUser);
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }
}
