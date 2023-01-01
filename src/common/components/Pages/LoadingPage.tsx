import { Flex, Spinner, Text } from '@chakra-ui/react'

const LoadingPage = () => {
  return (
    <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
      <Spinner mx={'auto'} size="xl" />
      <Text fontWeight={'medium'}>Loading...</Text>
    </Flex>
  )
}

export default LoadingPage
