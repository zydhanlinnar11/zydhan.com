import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import Loading from '@/common/components/Loading'
import { User } from '@/common/types/User'
import {
  Card,
  CardBody,
  useColorModeValue,
  CardHeader,
  Heading,
  Divider,
  Button,
  Box,
} from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  user: User
}

const isSocialLinked = (socialMedia: string[], id: string) =>
  typeof socialMedia.find((item) => item === id) !== 'undefined'

const SocialMediaSection: FC<Props> = ({ user }) => {
  const { socialMediaList, isLoading } = useSocialMediaList()

  return (
    <Card as={'section'} variant={useColorModeValue('filled', 'outline')}>
      <CardHeader>
        <Heading fontSize={'xl'}>Social Media</Heading>
      </CardHeader>
      <CardBody paddingY={0}>
        <Divider />
      </CardBody>
      <CardBody
        textAlign={'center'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'4'}
      >
        {isLoading && (
          <Box py={'4'}>
            <Loading />
          </Box>
        )}
        {socialMediaList?.map(({ id, name }) => (
          <Button
            key={id}
            variant={
              isSocialLinked(user.social_media, id) ? 'outline' : 'solid'
            }
          >
            {isSocialLinked(user.social_media, id) ? 'Connected to' : 'Link to'}{' '}
            {name}
          </Button>
        ))}
      </CardBody>
    </Card>
  )
}

export default SocialMediaSection
