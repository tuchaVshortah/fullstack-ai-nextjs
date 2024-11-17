import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (request: Request) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id as string,
      content: 'Wriet about your day!',
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
