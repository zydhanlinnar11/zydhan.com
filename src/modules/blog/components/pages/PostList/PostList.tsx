import { Heading, VStack, Icon, Text } from '@chakra-ui/react'
import { FaRegSadTear } from 'react-icons/fa'

const PostList = () => {
  return (
    <VStack alignItems={'start'}>
      <Heading as={'h1'}>Blog</Heading>
      <Text fontWeight={'semibold'}>
        Here is some articles focused on web development.
      </Text>
      <VStack w={'full'} py={16} spacing={'4'}>
        <Icon as={FaRegSadTear} boxSize={'16'} />
        <Text textAlign={'center'}>
          I'm sorry, but currently we don't have anything to read. 📰
        </Text>
        <Text textAlign={'center'}>
          Please come back later and i will bring you good article! ☕
        </Text>
      </VStack>
    </VStack>
  )
}

export default PostList
