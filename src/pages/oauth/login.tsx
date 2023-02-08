import { config } from '@/common/config'
import { withSessionSsr } from '@/common/config/iron-session'
import useSocialMediaList from '@/common/hooks/useSocialMediaList'
import { LoginController } from '@/oauth/backend/controllers/LoginController'
import { getProvider } from '@/oauth/backend/lib/oidc'
import SocialMediaLoginButton from '@/oauth/Button/SocialMediaLoginButton'
import { Container, Heading, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { PromptDetail, errors } from 'oidc-provider'

export type LoginPageProps = {
  client: {
    name: string | null
  }
  dbg: null | {
    params: {
      [key: string]: any
    }
    prompt: PromptDetail
  }
}

const LoginPage = (props: LoginPageProps) => {
  const { client } = props
  const socialMediaList = useSocialMediaList()

  return (
    <>
      <NextSeo
        title="Login"
        openGraph={{
          url: `${config.frontendUrl}/oauth/login`,
          title: 'Login',
        }}
      />
      <Container
        textAlign={'center'}
        gap={'4'}
        w={'full'}
        maxW={'sm'}
        centerContent
      >
        <Heading as={'h1'}>Login</Heading>
        <Text>
          Log in to {client.name ? <b>{client.name}</b> : 'your account'}.
        </Text>

        {socialMediaList?.map((socialMedia) => (
          <SocialMediaLoginButton
            socialMedia={socialMedia}
            key={socialMedia.id}
          />
        ))}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ req, res, query }) => {
    const userId = req.session.userId
    console.log(userId)
    if (userId) return { redirect: { destination: '/', permanent: false } }

    try {
      const provider = await getProvider(req)
      const { prompt, params } = await provider.interactionDetails(req, res)
      const controller = new LoginController(provider, { params, prompt })

      const isOAuthCallback = typeof query.code === 'string'

      if (isOAuthCallback) return await controller.login(req, res, query)
      return await controller.show()
    } catch (e) {
      if (e instanceof errors.InvalidRequest) return { notFound: true }
      throw e
    }
  }
)

export default LoginPage
