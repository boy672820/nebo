import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
}));
