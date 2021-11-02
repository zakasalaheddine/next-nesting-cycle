// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from 'utils/db/prisma'

export default async function handler(req, res) {
  if (req.method !== 'POST') return
  const { name, ringNumber, sexe, type } = req.body
  const bird = await prisma.bird.create({
    data: { name: name, ringNumber: ringNumber, sexe: sexe, birdsTypeId: type }
  })
  res.status(200).json({ bird })
}
