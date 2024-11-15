import { auth } from '@clerk/nextjs/server'
import { prisma } from './db'

export const getUserByClerkID = async () => {
  const clerkUser = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: clerkUser.userId as string,
    },
  })

  return user
}
