import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';
import { IsPassword } from '@core/validators';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: false })
  readonly name?: string;

  @ApiProperty()
  @IsPassword()
  readonly password: string;
}
