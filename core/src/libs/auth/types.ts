import { User } from '@prisma/client';

export type LocalOptions = {
  usernameField?: string;
  passwordField?: string;
};

export type LocalPayload = User;
