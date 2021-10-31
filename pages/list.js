import { Box } from '@chakra-ui/layout'
import BirdsList from 'components/birds/birds-list'
import Layout from 'components/layout'

export default function ListsOfBirds() {
  return (
    <Layout>
      <Box w={['full', 'md', 'lg']} mx="auto">
        <BirdsList />
      </Box>
    </Layout>
  )
}
