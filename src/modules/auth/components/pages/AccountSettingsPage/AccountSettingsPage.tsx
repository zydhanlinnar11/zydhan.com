import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import withPrivateRoute from '@/common/hooks/withPrivateRoute'
import { User } from '@/common/types/User'
import { FC } from 'react'
import { NextSeo } from 'next-seo'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import UserInfoSection from './UserInfoSection'
import SocialMediaSection from './SocialMediaSection'

type Props = {
  user: User
}

const AccountSettingPage: FC<Props> = ({ user }) => {
  const { back } = useRouter()

  return (
    <>
      <NextSeo title="Account Settings" />
      <Flex
        direction={{ base: 'row-reverse', md: 'row' }}
        justifyContent={{ base: 'left', md: 'space-between' }}
        columnGap={4}
      >
        <Heading as={'h1'}>Account Settings</Heading>
        <Button
          leftIcon={<ArrowBackIcon />}
          variant={'outline'}
          onClick={() => back()}
          display={{ base: 'none', md: 'flex' }}
        >
          <Text>Back</Text>
        </Button>
      </Flex>
      <Flex
        marginTop={8}
        direction={{ base: 'column', md: 'row' }}
        rowGap={'4'}
        columnGap={'8'}
        justifyContent={'space-between'}
      >
        <UserInfoSection user={user} />
        <Flex direction={'column'} rowGap={'4'} w={'full'}>
          <SocialMediaSection user={user} />
        </Flex>
      </Flex>
    </>
  )
}

export default withPrivateRoute(AccountSettingPage)
