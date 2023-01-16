import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsPassword } from '@core/common/validators';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly name?: string;

  @ApiProperty()
  @IsPassword()
  readonly password: string;
}
