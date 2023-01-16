import { IsEnum } from 'class-validator';
import { MeFieldEnum, MeFieldType } from '../user.constants';

export class MeQueriesDto {
  @IsEnum(MeFieldEnum, { each: true, message: '가져올 필드를 입력해주세요.' })
  readonly field: MeFieldType[];
}
