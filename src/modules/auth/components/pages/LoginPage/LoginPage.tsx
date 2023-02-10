import LoadingPage from '@/common/components/Pages/LoadingPage'
import { config } from '@/common/config'
import { Container, Heading, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { ClientSafeProvider, getProviders, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { memo } from 'react'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

type Props = {
  providers: ClientSafeProvider[]
}

const LoginPage = ({ providers }: Props) => {
  const { status } = useSession()
  const { isReady, push } = useRouter()

  if (status === 'authenticated' && isReady) {
    push('/')
  }

  if (status === 'authenticated' || status === 'loading') return <LoadingPage />

  return (
    <>
      <NextSeo
        title="Login"
        openGraph={{
          url: `${config.frontendUrl}/auth/login`,
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
          Log in to <b>zydhan.com</b>
        </Text>

        {providers?.map((socialMedia) => (
          <SocialMediaLoginButton
            socialMedia={socialMedia}
            key={socialMedia.id}
          />
        ))}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const providers = Object.values((await getProviders()) ?? {})

  return { props: { providers } }
}

export default memo(LoginPage)
