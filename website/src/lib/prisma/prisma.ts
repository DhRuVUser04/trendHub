import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const rpp_user = Number(process.env.RPP_USER) ?? 10;
export const skipCondition = ({ page, rpp }: { page: number; rpp: number }) =>
  page >= 1 ? (page - 1) * rpp : 10;
