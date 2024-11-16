import React from 'react'
import { prisma } from '@/utils/db'
import { getUserByClerkID } from '@/utils/auth'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'

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
  return (
    <div className="grid grid-cols-3 gap-4">
      <NewEntryCard />
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

export default JournalPage
