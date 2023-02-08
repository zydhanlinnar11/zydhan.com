import { config } from '@/common/config'
import { withSessionSsr } from '@/common/config/iron-session'
import { backendFetcher } from '@/common/hooks/useAxios'
import { ConsentController } from '@/oauth/backend/controllers/ConsentController'
import { getProvider } from '@/oauth/backend/lib/oidc'
import { AuthorizationConsentDataScope } from '@/oauth/types/AuthorizationConsentDataScope'
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
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { errors, PromptDetail } from 'oidc-provider'
import { FormEventHandler } from 'react'

export type ConsentPageProps = {
  client: {
    name: string | null
  }
  dbg: null | {
    params: {
      [key: string]: any
    }
    prompt: PromptDetail
  }
  scopes: AuthorizationConsentDataScope[]
}

const ConsentPage = (props: ConsentPageProps) => {
  const { client, scopes } = props

  const authorize: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    backendFetcher
      .post<AuthorizationSuccess>(`/oauth/consent`)
      .then((response) => {
        window.open(response.data.location, '_self')
      })
  }

  const deny: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    backendFetcher
      .delete<AuthorizationSuccess>(`/oauth/consent`)
      .then((response) => {
        window.open(response.data.location, '_self')
      })
  }

  return (
    <>
      <NextSeo
        title="Consent"
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
            <strong>{client.name}</strong> is requesting permission to access
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
            <Form onSubmit={deny} w={'full'} method="POST">
              <input type="hidden" value={'deny'} />
              <Button w={'full'} type={'submit'} variant={'outline'}>
                Deny
              </Button>
            </Form>
            <Form onSubmit={authorize} w={'full'} method="POST">
              <input type="hidden" value={'authorize'} />
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

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ req, res, query }) => {
    const userId = req.session.userId
    if (!userId)
      return { redirect: { destination: '/api/auth/login', permanent: false } }

    const isAuthorizeAction = req.method === 'POST'
    const isDenyAction = req.method === 'DELETE'
    const provider = await getProvider(req)

    try {
      const { params, prompt, grantId } = await provider.interactionDetails(
        req,
        res
      )
      const controller = new ConsentController(
        provider,
        {
          params,
          prompt,
          grantId,
        },
        userId
      )

      if (isAuthorizeAction) return await controller.authorize(req, res)
      if (isDenyAction) return await controller.deny(req, res)
      return await controller.show()
    } catch (e) {
      if (e instanceof errors.InvalidRequest)
        return { redirect: { destination: '/400', permanent: false } }
      throw e
    }
  }
)

const Form = chakra('form')

export default ConsentPage
