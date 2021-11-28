import { prisma } from './prisma'

export const hashEgg = async (eggId, ringNumber, sexe) => {
  const egg = await prisma.nestEgges.findFirst({ where: { id: eggId } })
  // Add Hash Date to the EGG
  await prisma.nestEgges.update({
    where: { id: eggId },
    data: {
      dateHash: new Date()
    }
  })
  // Create new Bird and add relation to an existing siblings

}
