import { Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import NestDetails from 'components/nests/nest-details'
import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import { prisma } from 'utils/db/prisma'
import { getNestById } from 'utils/requests/nests'

export default function Nest({ nest }) {
  const { query } = useRouter()
  const { data } = useQuery(`nest`, () => getNestById(query.nest))
  return data && data.nest ? (
    <NestDetails nest={data.nest} />
  ) : (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
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
    props: { nest: JSON.stringify(nest) },
    revalidate: 1
  }
}
