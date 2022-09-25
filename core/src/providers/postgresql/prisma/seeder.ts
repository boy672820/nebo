import { PrismaClient } from '@prisma/client';
import { role } from './seeds';

const prisma = new PrismaClient();

async function main() {
  await Promise.all([role()]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
