import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

export const PATCH = async (request: Request, { params }) => {
  params = await params
  const content = await request.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  await prisma.analysis.update({
    where: {
      entryId: updatedEntry.id,
    },
    data: {
      ...(await analyze(updatedEntry.content)),
    },
  })

  return NextResponse.json({ data: updatedEntry })
}
