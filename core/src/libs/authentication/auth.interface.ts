import { AuthResult } from './auth.types';

export interface AuthServiceFactory {
  validateUser(email: string, password: string): Promise<AuthResult>;
}
