// import { PrismaClient, Prisma } from '@prisma/client';

const seedName = 'role_types';
// const prisma = new PrismaClient().roleType;

// const inputs: Prisma.RoleTypeCreateInput[] = [
//   { roleType: 'admin' },
//   { roleType: 'user' },
// ];

export async function role() {
  console.log(`Start "${seedName}" seeding ...`);

  // const promises = [];

  // for (const data of inputs) {
  //   promises.push(
  //     prisma.upsert({
  //       where: { ...data },
  //       create: { ...data },
  //       update: { ...data },
  //     }),
  //   );
  // }

  // await Promise.all(promises);

  console.log(`"${seedName}" Seeding finished.`);
}
