import { User } from '@/common/types/User'
import { Card, CardBody, Text, Icon } from '@chakra-ui/react'
import { FC } from 'react'
import { FaUserAlt } from 'react-icons/fa'

type Props = {
  user: User
}

const UserInfoSection: FC<Props> = ({ user: { name, email } }) => {
  return (
    <Card
      as={'section'}
      variant={'outline'}
      h={'fit-content'}
      minWidth={'fit-content'}
      maxWidth={{ base: 'full', md: 'xs' }}
    >
      <CardBody textAlign={'center'}>
        <Icon as={FaUserAlt} boxSize={'8'} />
        <Text>{name}</Text>
        <Text>{email}</Text>
      </CardBody>
    </Card>
  )
}

export default UserInfoSection
