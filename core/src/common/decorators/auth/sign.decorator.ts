import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { AuthSignInterceptor } from '@core/libs/authentication/interceptors';

export function AuthSign() {
  return applyDecorators(UseInterceptors(AuthSignInterceptor));
}
