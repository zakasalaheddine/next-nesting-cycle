import { Grid } from '@chakra-ui/layout'
import AddNestFloatingButton from './add-nest-button'
import Nest from './nest'

const NestsData = [
  { id: 1, name: 'Nest 1', male: 'Canary 1234', female: 'Canary 3344' },
  { id: 2, name: 'Nest 2', male: 'Canary 4435', female: 'Canary 9899' },
  { id: 3, name: 'Nest 3', male: 'Canary 7765', female: 'Canary 9987' },
  { id: 4, name: 'Nest 4', male: 'Canary 0098', female: 'Canary 6566' },
  { id: 5, name: 'Nest 5', male: 'Canary 9099', female: 'Canary 0900' }
]

export default function Nests() {
  return (
    <>
      <Grid
        templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']}
        gap={10}
        mx="auto"
      >
        <AddNestFloatingButton />
        {NestsData.map((nest) => (
          <Nest
            name={nest.name}
            male={nest.male}
            female={nest.female}
            key={nest.id}
          />
        ))}
      </Grid>
    </>
  )
}
