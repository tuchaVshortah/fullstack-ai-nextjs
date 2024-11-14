import { Prisma, PrismaClient } from '@prisma/client'

const globalForPrima = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrima.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrima.prisma = prisma
