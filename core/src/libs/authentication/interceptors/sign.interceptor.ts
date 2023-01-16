import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@utils';
import { InvalidCredentialsException } from '@core/common/errors/auth';
import { AuthResult, AuthToken, JWTPayloadClaims } from '../auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthSignInterceptor<T extends object = AuthResult>
  implements NestInterceptor
{
  constructor(private readonly jwt: JwtService) {}

  /**
   * 로그인 인증토큰 생성
   * @param userId 사용자 PK
   * @returns 인증토큰
   */
  private generateToken(userId: User['userId']): string {
    return this.jwt.sign<JWTPayloadClaims>('access', {
      userId: userId.toString(),
    });
  }

  /**
   * 로그인 인증토큰 생성(갱신용)
   * @param userId 사용자 PK
   * @returns 인증토큰(갱신용)
   */
  private generateRefreshToken(userId: User['userId']): string {
    return this.jwt.sign<JWTPayloadClaims>('refresh', {
      userId: userId.toString(),
    });
  }

  /**
   * 로그인 인증토큰 업데이트
   * @param param0
   * @returns
   */
  // private async updateAuth(): Promise<void> {}

  // -----------------------------------------------------------------------

  /**
   * 인터셉터: 요청 후 처리
   * 로그인 인증토큰 생성
   * @param data
   * @returns
   */
  private after(data: T): T & AuthToken {
    if (!data || !('userId' in data)) {
      throw new InvalidCredentialsException();
    }

    const result = data as T & AuthResult;
    const userId = result.userId;

    const accessToken = this.generateToken(userId);
    const refreshToken = this.generateRefreshToken(userId);

    // this.updateAuth({ userId }, auth);

    delete result.userId;

    return { ...result, accessToken, refreshToken };
  }

  // -----------------------------------------------------------------------

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map<T, AuthToken>((data) => this.after(data)));
  }
}
