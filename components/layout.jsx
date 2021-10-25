import { Box } from '@chakra-ui/layout'
import styled from '@emotion/styled'

export default function Layout({ children }) {
  return <LayoutContainer as="main">{children}</LayoutContainer>
}

const LayoutContainer = styled(Box)`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
`
