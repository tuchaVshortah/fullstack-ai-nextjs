import React from 'react'
import { prisma } from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = prisma.journalEntry.findMany({
    where: {
      userId: user.id as unknown as string,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries', entries)
  return <div>JournalPage</div>
}

export default JournalPage
