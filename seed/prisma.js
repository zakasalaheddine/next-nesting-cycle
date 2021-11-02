const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

;(async () => {
  console.log(`Start seeding ...`)
  const canaryType = await prisma.birdsType.create({ data: { name: 'Canary' } })
  console.log(`Created Canary Type with id: ${canaryType.id}`)
  const lma9nyType = await prisma.birdsType.create({ data: { name: 'Lma9ny' } })
  console.log(`Created Lma9ny Type with id: ${lma9nyType.id}`)
  console.log(`Seeding finished.`)
})()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
