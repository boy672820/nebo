import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.handleExceptions();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async handleExceptions() {
    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      try {
        const result = await next(params);

        return result;
      } catch (e) {
        if (e.code === 'P2002' && e.meta.target.includes('email')) {
          throw new Error('Email already exists');
        }
      }
    });
  }
}
