import { oauth2Providers } from '@/auth/backend/config/oauth2-providers'
import useSocialMediaCallback from '@/auth/hooks/useSocialMediaCallback'
import Link from '@/common/components/Link'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import ServerErrorIcon from '@/common/components/Pages/ServerErrorPage/ServerErrorIcon'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'

const CallbackPage = () => {
  const { error } = useSocialMediaCallback()

  if (!error) return <LoadingPage />

  return (
    <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
      <Flex marginX={'auto'}>
        <ServerErrorIcon />
      </Flex>
      <Heading as={'h1'}>400 - Bad Request</Heading>
      <Text>
        {error === 'already_linked_to_another_user'
          ? 'This account is already linked with another account!'
          : 'This email is already linked with existing account!'}
      </Text>
      {error && (
        <Text>
          Use another method to log in and link this social media account in{' '}
          <Link href="/auth/account/settings">account settings</Link>
        </Text>
      )}
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: oauth2Providers.map(({ id }) => ({ params: { socialMedia: id } })),
    fallback: false,
  }
}

export default CallbackPage
