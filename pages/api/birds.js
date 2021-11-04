// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from 'utils/db/prisma'

export default async function handler(req, res) {
  if (req.method !== 'GET') return
  const birds = await prisma.bird.findMany({ include: { BirdsType: true } })
  prisma.$disconnect()
  res.status(200).json({ birds })
}
