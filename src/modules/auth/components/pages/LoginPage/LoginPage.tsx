import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import { config } from '@/common/config'
import { Container, Heading, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { memo } from 'react'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

const LoginPage = () => {
  const { error, isLoading, socialMedia } = useSocialMediaList()
  const { status } = useSession()

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
