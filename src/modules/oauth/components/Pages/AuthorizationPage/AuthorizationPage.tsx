import LoadingPage from '@/common/components/Pages/LoadingPage'
import { config } from '@/common/config'
import { backendFetcher } from '@/common/hooks/useAxios'
import useAuthorization from '@/oauth/hooks/useAuthorization'
import useAuthorizationErrorPage from '@/oauth/hooks/useAuthorizationErrorPage'
import withAuthorizationRoute from '@/oauth/hooks/withAuthorizationRoute'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'
import {
  Box,
  Button,
  Card,
  CardBody,
  chakra,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import axios from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FormEventHandler, memo } from 'react'

const AuthorizationPage = () => {
  const { data, error, isLoading } = useAuthorization()
  const errorPage = useAuthorizationErrorPage(error?.response?.data)
  const { query } = useRouter()

  if (errorPage) return errorPage
  if (!data || isLoading) return <LoadingPage />
  if ('location' in data) {
    window.open(data.location, '_self')
    return <LoadingPage />
  }

  const { client_name, scopes } = data

  const authorize: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    backendFetcher
      .post<AuthorizationSuccess>(`/api/oauth/interactions/${query.uid}`)
      .then((response) => {
        window.open(response.data.location, '_self')
      })
  }

  const deny: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    backendFetcher
      .delete(`/api/oauth/interactions/${query.uid}`)
      .catch((error) => {
        if (!axios.isAxiosError<AuthorizationError>(error))
          throw new Error('invalid_response')
        const data = error.response?.data.data
        if (data?.action !== 'redirect') throw new Error('invalid_response')
        window.open(data.location, '_self')
      })
  }

  return (
    <>
      <NextSeo
        title="Login"
        openGraph={{
          url: `${config.frontendUrl}/oauth/authorize`,
          title: 'Login',
        }}
      />

      <Card
        mx={'auto'}
        textAlign={'center'}
        w={'full'}
        maxW={'sm'}
        variant={'outline'}
      >
        <CardBody gap={'8'} display={'flex'} flexDir={'column'}>
          <Heading as={'h1'} fontSize={'lg'} fontWeight={'semibold'}>
            <strong>{client_name}</strong> is requesting permission to access
            your account.
          </Heading>
          {scopes.length > 0 ? (
            <Box textAlign={'left'}>
              <Text as={'strong'}>This application will be able to:</Text>

              <UnorderedList>
                {scopes.map(({ description, id }) => (
                  <ListItem key={id}>{description}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          ) : (
            <></>
          )}
          <HStack w={'full'} justifyContent={'space-evenly'}>
            <Form onSubmit={deny} w={'full'}>
              <Button w={'full'} type={'submit'} variant={'outline'}>
                Deny
              </Button>
            </Form>
            <Form onSubmit={authorize} w={'full'}>
              <Button w={'full'} type={'submit'}>
                Authorize
              </Button>
            </Form>
          </HStack>
        </CardBody>
      </Card>
    </>
  )
}

const Form = chakra('form')

export default withAuthorizationRoute(memo(AuthorizationPage))
