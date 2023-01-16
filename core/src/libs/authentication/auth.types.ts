import { User } from '@prisma/client';

export type LocalOptions = {
  usernameField?: string;
  passwordField?: string;
};

export type AuthToken = { accessToken: string; refreshToken: string };
export type AuthResult = Pick<User, 'userId' | 'email' | 'name'>;

export type JWTPayloadClaims = { userId: string };
