// src/client.ts
import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";
var globalForPrisma = global;
var prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export {
  prisma
};
