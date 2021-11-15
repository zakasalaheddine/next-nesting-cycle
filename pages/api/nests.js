import { prisma } from 'utils/db/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const nests = await prisma.nest.findMany({
      include: { male: true, female: true, NestEgges: true }
    })
    prisma.$disconnect()
    return res.status(200).json({ nests })
  }
  if (req.method === 'POST') {
    const { male, female } = req.body
    const nest = await prisma.nest.create({
      data: {
        name: '',
        femaleId: female,
        maleId: male
      },
      include: { male: true, female: true }
    })
    prisma.$disconnect()
    return res.status(200).json({ nest })
  }
}
