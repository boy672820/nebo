import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@providers/postgresql/prisma/enum';
import { IS_PUBLIC_KEY, IS_VERIFIED_KEY } from '../auth.constants';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 공용 라우트인지 확인
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: unknown, user: any, _: any, context: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // 인증된 사용자인지 확인
    const isVerified = this.reflector.getAllAndOverride<boolean>(
      IS_VERIFIED_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 인증된 사용자가 아니면 에러
    if (isVerified && user.role !== Role.Verified) {
      throw new ForbiddenException();
    }

    return user;
  }
}
