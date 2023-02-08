import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import { config } from '@/common/config'
import useCSRFCookie from '@/common/hooks/useCSRFCookie'
import { useUser } from '@/common/providers/UserProvider'
import { Container, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { memo, useEffect } from 'react'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

const LoginPage = () => {
  useCSRFCookie()

  const socialMediaList = useSocialMediaList()
  const { state } = useUser()
  const { replace, query, isReady } = useRouter()

  useEffect(() => {
    if (state !== 'AUTHENTICATED' || !isReady) return

    const url = query.redirect
    const origin = window.location.origin
    if (typeof url !== 'string' || !url.startsWith(origin)) {
      replace('/')
      return
    }
    replace({ pathname: url.replace(origin, '') })
  }, [state, replace, isReady, query])

  if (state === 'AUTHENTICATED' || state === 'LOADING') return <LoadingPage />

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

export default memo(LoginPage)
