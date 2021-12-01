import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import styled from '@emotion/styled'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <LayoutContainer as="main">
      <ButtonGroup size="lg" isAttached mx="auto" my="5" variant="outline">
        <Link href="/">
          <Button mr="-px" colorScheme="red" as="a" cursor="pointer">
            Nests
          </Button>
        </Link>
        <Link href="/list">
          <Button mr="-px" colorScheme="teal" as="a" cursor="pointer">
            Birds
          </Button>
        </Link>
      </ButtonGroup>
      <section>{children}</section>
    </LayoutContainer>
  )
}

const LayoutContainer = styled(Box)`
  display: flex;
  width: 100vw;
  flex-direction: column;
`
