import "server-only";
import { PrismaClient } from "@prisma/client";

/**
 * SERVER-ONLY. Never import this from a Client Component.
 *
 * Standard Next.js dev-mode-safe Prisma singleton: without this,
 * every hot-reload in development would create a new PrismaClient
 * and exhaust the database connection pool. In production a single
 * instance is created per server process, which is what we want.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
