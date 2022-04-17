import { Injectable } from '@nestjs/common';
import { UserDao } from '@providers/postgresql/dao';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create() {}
}
