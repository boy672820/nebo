import { applyDecorators, UseGuards } from '@nestjs/common';
import { LocalGuard } from '@core/common/guards/auth';

export function Local() {
  return applyDecorators(UseGuards(LocalGuard));
}
