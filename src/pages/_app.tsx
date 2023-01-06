import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@/common/providers/UserProvider'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@/common/components/Layout'
import theme from 'theme'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserProvider>
  )
}
