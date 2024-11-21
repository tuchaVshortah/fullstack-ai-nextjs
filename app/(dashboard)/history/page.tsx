import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import React from 'react'

const History = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({})
  return <div>History</div>
}

export default History
