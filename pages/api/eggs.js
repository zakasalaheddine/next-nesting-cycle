import { prisma } from 'utils/db/prisma'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nest } = req.body
    await prisma.nestEgges.create({ data: { nestId: nest.nestId } })
    prisma.$disconnect()
    res.status(200).json({ success: true })
  }
}
