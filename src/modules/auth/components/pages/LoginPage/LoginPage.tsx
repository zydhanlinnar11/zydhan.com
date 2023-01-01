import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import withAuthRoute from '@/auth/hooks/withAuthRoute'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import { config } from '@/common/config'
import useCSRFCookie from '@/common/hooks/useCSRFCookie'
import { Container, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { memo } from 'react'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

const LoginPage = () => {
  useCSRFCookie()
  const { socialMediaList, isLoading } = useSocialMediaList()

  if (isLoading) return <LoadingPage />

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
        <Text>Log in to your account</Text>

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

export default withAuthRoute(memo(LoginPage))
