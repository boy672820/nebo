import { Body, Controller, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthSign, Public, User } from '@core/common/decorators/auth';
import { Get, Post } from '@core/common/decorators';
// types
import { AuthResult } from '@libs';
import { JWTUserPayload } from '@core/authentication';
//
import { CreateUserDto, MeQueriesDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @AuthSign()
  @Post({ summary: 'Sign Up', description: 'Create new user' })
  async create(@Body() data: CreateUserDto): Promise<AuthResult> {
    const newUser = await this.service.create(data);

    return newUser;
  }

  @Get('me')
  me(
    @User() { userId }: JWTUserPayload,
    @Query() { field: fields }: MeQueriesDto,
  ) {
    const select =
      fields instanceof Array
        ? fields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {} as Prisma.UserSelect)
        : { [fields]: true };

    return this.service.user({ where: { userId }, select });
  }
}
