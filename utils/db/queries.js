import { prisma } from './prisma'

// NESTS
export const prismaGetAllNests = async () => {
  const nests = await prisma.nest.findMany({
    include: { male: true, female: true, NestEgges: true }
  })
  prisma.$disconnect()
  return nests
}

export const prismaGetSingleNest = async (id) => {
  const nest = await prisma.nest.findFirst({
    where: { id: id },
    include: {
      female: { include: { BirdsType: true } },
      male: { include: { BirdsType: true } },
      NestEgges: true
    }
  })
  prisma.$disconnect()
  return nest
}

// BIRDS
export const prismaGetAllBirds = async () => {
  const birds = await prisma.bird.findMany({ include: { BirdsType: true } })
  prisma.$disconnect()
  return birds
}

export const prismaGetSingleBird = async (id) => {
  const bird = await prisma.bird.findFirst({
    where: { id: id },
    include: {
      BirdsType: true
    }
  })
  prisma.$disconnect()
  return bird
}
