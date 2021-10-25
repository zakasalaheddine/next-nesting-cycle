import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import styled from '@emotion/styled'

export default function Nest({ name, male, female }) {
  return (
    <NestButton>
      <NestName fontSize="3xl">{name}</NestName>
      <Box fontSize="sm">
        <BirdName>{male}</BirdName>
        <BirdName>{female}</BirdName>
      </Box>
    </NestButton>
  )
}

const NestButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 10px;
  margin: 10px 0px;
`
const NestName = styled(Text)`
  font-weight: bold;
`
const BirdName = styled(Text)`
  font-weight: lighter;
`