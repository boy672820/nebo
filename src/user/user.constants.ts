import { Prisma } from '@prisma/client';

export const MeFieldEnum = {
  [Prisma.UserScalarFieldEnum.email]: Prisma.UserScalarFieldEnum.email,
  [Prisma.UserScalarFieldEnum.name]: Prisma.UserScalarFieldEnum.name,
};

export type MeFieldType = keyof typeof MeFieldEnum;
