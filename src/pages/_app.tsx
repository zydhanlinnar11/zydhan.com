import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  useRefetchUser,
  UserProvider,
  useUser,
} from '@/common/providers/UserProvider'
import { FormEventHandler, useCallback } from 'react'
import { backendFetcher } from '@/common/hooks/useAxios'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@/common/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserProvider>
  )
}

const LogoutButton = () => {
  const { user } = useUser()
  const refetchUser = useRefetchUser()

  const handleLogout: FormEventHandler = useCallback((e) => {
    e.preventDefault()
    backendFetcher.delete('/auth/logout').then(() => {
      refetchUser && refetchUser()
    })
  }, [])

  return user ? (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  ) : (
    <></>
  )
}
