import { Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import NestDetails from 'components/nests/nest-details'
import { queryNest, useNest } from 'graphql/queries/useNest'
import { queryNests } from 'graphql/queries/useNests'
import { useRouter } from 'next/dist/client/router'

export default function Nest({ nest }) {
  const { query } = useRouter()
  const nestQuery = useNest(query.nest, nest)
  return nestQuery && nestQuery.data ? (
    <NestDetails nest={nestQuery.data} />
  ) : (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  )
}

export async function getStaticPaths() {
  const nests = await queryNests()
  const paths = nests.map((nest) => ({ params: { nest: nest.id } }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const nest = await queryNest(params.nest)
  return {
    props: { nest },
    revalidate: 1
  }
}
