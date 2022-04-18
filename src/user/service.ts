import { Injectable } from '@nestjs/common';
import { UserDao } from '@providers/postgresql/dao';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create(data: CreateUserDto) {
    const password = await argon2.hash(data.password);
    const newUser = await this.userDao.create({ ...data, password });

    return newUser;
  }
}
