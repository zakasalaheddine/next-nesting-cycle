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
  console.log({ males, females })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data } = useQuery('nests', getAllNests, { initialData: nests })
  console.log(data.nests)
  return (
    <>
      <Grid
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']}
        gap={10}
        mx="auto"
      >
        <AddNestFloatingButton onClick={onOpen} />
        {data.nests &&
          data.nests.map((nest) => (
            <Nest
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
