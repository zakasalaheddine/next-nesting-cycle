import { prisma } from 'utils/db/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (!req.query.nest) return res.status(404)
    const nest = await prisma.nest.findFirst({
      where: { id: req.query.nest },
      include: {
        female: { include: { BirdsType: true } },
        male: { include: { BirdsType: true } },
        NestEgges: true
      }
    })
    prisma.$disconnect()
    return res.status(200).json({ nest })
  }
}
