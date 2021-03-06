import { useDisclosure } from '@chakra-ui/hooks'
import { Grid } from '@chakra-ui/layout'
import { useQuery } from 'react-query'
import { getAllNests } from 'utils/requests/nests'
import AddNestFloatingButton from './add-nest-button'
import AddNestModal from './add-nest-modal'
import Nest from './nest'

export default function Nests({ nests, birds }) {
  const males = birds.filter((bird) => bird.sexe === 'male')
  const females = birds.filter((bird) => bird.sexe === 'female')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Grid
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']}
        gap={10}
        mx="auto"
      >
        <AddNestFloatingButton onClick={onOpen} />
        {nests &&
          nests.map((nest, idx) => (
            <Nest
              id={nest.id}
              number={idx}
              name={nest.name}
              male={nest.male}
              female={nest.female}
              key={nest.id}
            />
          ))}
      </Grid>
      <AddNestModal
        isOpen={isOpen}
        onClose={onClose}
        males={males}
        females={females}
      />
    </>
  )
}
