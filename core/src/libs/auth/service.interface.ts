import { User } from '@prisma/client';

export interface AuthServiceFactory {
  validateUser(email: string, password: string): Promise<User>;
}
