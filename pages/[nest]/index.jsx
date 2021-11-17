import NestDetails from 'components/nests/nest-details'
import { prisma } from 'utils/db/prisma'

export default function Nest({ nest }) {
  return <NestDetails nest={nest} />
}

export async function getStaticPaths() {
  const nests = await prisma.nest.findMany()
  const paths = nests.map((nest) => ({ params: { nest: nest.id } }))
  return {
    paths,
    fallback: true // See the "fallback" section below
  }
}

export async function getStaticProps({ params }) {
  const nest = await prisma.nest.findFirst({
    where: { id: params.nest },
    include: {
      female: { include: { BirdsType: true } },
      male: { include: { BirdsType: true } },
      NestEgges: true
    }
  })
  return {
    props: { nest },
    revalidate: 1
  }
}
