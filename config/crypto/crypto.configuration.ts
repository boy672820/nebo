import { registerAs } from '@nestjs/config';

export default registerAs('crypto', () => ({
  password: process.env.CRYPTO_PASSWORD,
}));
