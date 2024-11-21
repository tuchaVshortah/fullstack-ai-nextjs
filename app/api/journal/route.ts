import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { analyze } from '@/utils/ai'

export const POST = async (request: Request) => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id as string,
      content: 'Write about your day!',
    },
  })

  const analysis = await analyze(entry.content)
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    },
  })

  revalidatePath('/journal')
  return NextResponse.json({ data: entry })
}
