import { config } from '@/common/config'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import NextLink from 'next/link'

const useAuthorizationErrorPage = (error?: AuthorizationError) => {
  if (!error) return null

  const { data } = error
  if (data.action === 'redirect') {
    window.open(data.location, '_self')
    return null
  }

  const { error: err_code, error_description } = data.payload

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
        <CardHeader>
          <Heading as={'h1'} fontSize={'lg'} fontWeight={'semibold'}>
            Access blocked: Authorization Error
          </Heading>
        </CardHeader>
        <CardBody textAlign={'left'}>
          <Text>Error code: {err_code}</Text>
          <Text>Error description: {error_description}</Text>
        </CardBody>
        <CardFooter>
          <Link
            as={NextLink}
            href={'/'}
            w={'full'}
            _hover={{ textDecoration: 'none' }}
          >
            <Button w={'full'}>Back to Home Page</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}

export default useAuthorizationErrorPage
