import { config } from '@/common/config'
import { backendFetcher } from '@/common/hooks/useAxios'
import withPrivateRoute from '@/common/hooks/withPrivateRoute'
import { useRefetchUser } from '@/common/providers/UserProvider'
import { Button, Card, CardBody, Heading, HStack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { memo, useCallback } from 'react'

const LogoutPage = () => {
  const router = useRouter()
  const refetchUser = useRefetchUser()

  const logout = useCallback(() => {
    backendFetcher.delete('/api/auth/logout').then(() => {
      refetchUser && refetchUser()
    })
  }, [refetchUser])

  return (
    <>
      <NextSeo
        title="Logout"
        openGraph={{
          url: `${config.frontendUrl}/auth/logout`,
          title: 'Logout',
        }}
      />
      <Card
        mx={'auto'}
        textAlign={'center'}
        w={'full'}
        maxW={'sm'}
        variant={'outline'}
      >
        <CardBody gap={'4'} display={'flex'} flexDir={'column'}>
          <Heading as={'h1'}>Log out</Heading>
          <Text>Are you sure want to log out?</Text>
          <HStack w={'full'} justifyContent={'space-evenly'}>
            <Button
              w={'full'}
              variant={'outline'}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button w={'full'} onClick={logout}>
              Yes
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}

export default withPrivateRoute(memo(LogoutPage), false)
