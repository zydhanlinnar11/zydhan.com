import LoadingPage from '@/common/components/Pages/LoadingPage'
import ServerErrorPage from '@/common/components/Pages/ServerErrorPage'
import { config } from '@/common/config'
import { backendFetcher } from '@/common/hooks/useAxios'
import { useUser } from '@/common/providers/UserProvider'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { EndSessionResponse } from '@/oauth/types/EndSessionResponse'
import { Button, Card, CardBody, chakra, Heading, Text } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FormEventHandler, memo, useCallback, useEffect, useState } from 'react'
import useSWRImmutable from 'swr/immutable'

const LogoutPage = () => {
  const router = useRouter()
  const [swrKey, setSwrKey] = useState<null | string>(null)
  const { data, error, isLoading } = useSWRImmutable<
    AxiosResponse<EndSessionResponse>
  >(swrKey, backendFetcher)
  const { state } = useUser()

  useEffect(() => {
    if (!router.isReady) setSwrKey(null)
    setSwrKey(
      `/api/oauth/logout?${convertQueryToSearchParams(router.query).toString()}`
    )
  }, [router.isReady, router.query])

  useEffect(() => {
    if (state === 'UNAUTHENTICATED' && router.isReady) router.push('/')
  }, [router, state])

  if (isLoading || state !== 'AUTHENTICATED') return <LoadingPage />
  // TODO: handle error
  if (error) return <ServerErrorPage />

  return (
    <>
      <NextSeo
        title="Logout"
        openGraph={{
          url: `${config.frontendUrl}/oauth/logout`,
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
          <Form
            display={'flex'}
            gap={4}
            w={'full'}
            justifyContent={'space-evenly'}
            action={data?.data.action}
            encType="x-www-form-urlencoded"
            method="POST"
          >
            <input type="hidden" name="xsrf" value={data?.data.xsrf ?? ''} />
            <Button
              w={'full'}
              variant={'outline'}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button w={'full'} type="submit" name="logout" value={'yes'}>
              Yes
            </Button>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}

const Form = chakra('form')

export default memo(LogoutPage)
