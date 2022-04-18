import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create';
import { UserService } from './service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const newUser = await this.userService.create(data);

    return newUser;
  }
}
