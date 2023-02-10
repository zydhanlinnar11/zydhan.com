import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import ServerErrorPage from '@/common/components/Pages/ServerErrorPage'
import { config } from '@/common/config'
import { Container, Heading, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { memo } from 'react'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

const LoginPage = () => {
  const { error, isLoading, socialMedia } = useSocialMediaList()
  const { status } = useSession()
  const { isReady, push } = useRouter()

  if (status === 'authenticated' && isReady) {
    push('/')
  }

  if (status === 'authenticated' || status === 'loading' || isLoading)
    return <LoadingPage />
  if (error) return <ServerErrorPage />

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

        {socialMedia?.map((socialMedia) => (
          <SocialMediaLoginButton
            socialMedia={socialMedia}
            key={socialMedia.id}
          />
        ))}
      </Container>
    </>
  )
}

export default memo(LoginPage)
