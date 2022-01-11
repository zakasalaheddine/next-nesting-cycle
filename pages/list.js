import { Box, Stack } from '@chakra-ui/layout'
import BirdsList from 'components/birds/birds-list'
import Layout from 'components/layout'
import { useQuery } from 'react-query'
import { getAllBirds } from 'utils/requests/birds'
import { Skeleton } from '@chakra-ui/react'
import { queryBirdTypes } from 'graphql/queries/useBirdTypes'
import { useBirds } from 'graphql/queries/useBirds'
import { queryFamilies } from 'graphql/queries/useFamilies'

export default function ListsOfBirds({ types, families }) {
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
          <BirdsList birdsTypes={types} birds={data} families={families} />
        )}
      </Box>
    </Layout>
  )
}

export const getStaticProps = async (_) => {
  const birdsTypes = await queryBirdTypes()
  const families = await queryFamilies()
  return { props: { types: birdsTypes, families } }
}
