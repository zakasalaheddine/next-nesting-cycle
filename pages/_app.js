import { ChakraProvider } from '@chakra-ui/react'
import { RtlProvider } from 'components/rtl-provider'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RtlProvider>
          <Component {...pageProps} />
        </RtlProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
