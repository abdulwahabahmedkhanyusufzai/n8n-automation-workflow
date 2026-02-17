import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// @ts-expect-error - Prisma Client 7.4.0 generated types incorrectly enforce adapter/accelerateUrl
export const prisma = globalForPrisma.prisma || new PrismaClient({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;