import { Spinner, Text } from '@chakra-ui/react'

const Loading = () => {
  return (
    <>
      <Spinner mx={'auto'} size="xl" />
      <Text fontWeight={'medium'}>Loading...</Text>
    </>
  )
}

export default Loading
