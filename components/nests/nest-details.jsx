import { Button, IconButton } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import { CrackedEgg } from 'utils/icons/cracked-icon'

export default function NestDetails({ nest }) {
  console.log({ nest })
  const { male, female , NestEgges} = nest
  return (
    <DetailsContainer>
      <ParentsContainer>
        <Box>Male {`${male.BirdsType.name} ${male.ringNumber}`}</Box>
        <Box>Female {`${female.BirdsType.name} ${female.ringNumber}`}</Box>
      </ParentsContainer>
      <EggsContainer>
        {NestEgges.map((egg, idx) => (
          <Box>
            <Text>Egg ${idx + 1} | 25/10/2021</Text>
            <IconButton
              aria-label="Cracked Egg"
              icon={<CrackedEgg fill="none" />}
            />
          </Box>
        ))}
      </EggsContainer>

      <Button colorScheme="teal" mt="10" w="full">
        Add New Egg
      </Button>
    </DetailsContainer>
  )
}

const DetailsContainer = styled(Box)`
  max-width: 500px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const ParentsContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22px;
  font-weight: 700;
  div {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
  }
  div:nth-of-type(1) {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }
`

const EggsContainer = styled(Box)`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
`
