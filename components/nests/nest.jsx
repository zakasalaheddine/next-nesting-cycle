import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import { arLang } from 'lang/ar'
import Link from 'next/link'

export default function Nest({ id, male, female }) {
  return (
    <Link href={`/${id}`}>
      <NestButton as="a" cursor="pointer">
        <NestName fontSize="3xl">
          {arLang['Nest']} {id}
        </NestName>
        <Box fontSize="sm">
          <BirdName>{male?.ringNumber}</BirdName>
          <BirdName>{female?.ringNumber}</BirdName>
        </Box>
      </NestButton>
    </Link>
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
