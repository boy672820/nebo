import { User } from '@prisma/client';
import type { JWTPayloadClaims } from '@libs/authentication';

export type JWTUserPayload = User;
export type JWTAuthPayload = JWTPayloadClaims & { sub: string };
