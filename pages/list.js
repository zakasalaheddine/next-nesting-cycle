import { Box, Stack } from '@chakra-ui/layout'
import BirdsList from 'components/birds/birds-list'
import Layout from 'components/layout'
import { useQuery } from 'react-query'
import { prisma } from 'utils/db/prisma'
import { getAllBirds } from 'utils/requests/birds'
import { Skeleton } from '@chakra-ui/react'

export default function ListsOfBirds({ types }) {
  const { isLoading, data } = useQuery('birds', getAllBirds)
  return (
    <Layout>
      <Box w={['full', 'md', 'lg']} mx="auto">
        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <BirdsList birdsTypes={types} birds={data.birds} />
        )}
      </Box>
    </Layout>
  )
}

export const getStaticProps = async (_) => {
  const birdsTypes = await prisma.birdsType.findMany()
  return { props: { types: birdsTypes } }
}
