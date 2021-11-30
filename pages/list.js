import { Box, Stack } from '@chakra-ui/layout'
import BirdsList from 'components/birds/birds-list'
import Layout from 'components/layout'
import { useQuery } from 'react-query'
import { getAllBirds } from 'utils/requests/birds'
import { Skeleton } from '@chakra-ui/react'
import { queryBirdTypes } from 'graphql/queries/useBirdTypes'
import { useBirds } from 'graphql/queries/useBirds'

export default function ListsOfBirds({ types }) {
  const { isLoading, data } = useBirds()
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
          <BirdsList birdsTypes={types} birds={data} />
        )}
      </Box>
    </Layout>
  )
}

export const getStaticProps = async (_) => {
  const birdsTypes = await queryBirdTypes()
  return { props: { types: birdsTypes } }
}
