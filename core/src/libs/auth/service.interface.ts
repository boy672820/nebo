import { User } from '@prisma/client';

export interface AuthServiceInterface {
  validateUser(email: string, password: string): Promise<User>;
}
