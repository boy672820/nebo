import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}));
