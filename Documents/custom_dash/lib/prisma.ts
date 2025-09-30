// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Instantiates and exports a singleton Prisma Client instance.
 *
 * In development environments, Next.js hot-reloading can lead to multiple
 * PrismaClient instances being created if not handled carefully. This function
 * prevents that by storing the client instance on the global object (`globalThis`).
 *
 * In production environments, it simply creates and exports a single instance.
 *
 * @returns {PrismaClient} 
 */
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
  });
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

