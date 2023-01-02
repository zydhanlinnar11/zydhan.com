import { Flex } from '@chakra-ui/react'
import Loading from '@/common/components/Loading'

const LoadingPage = () => {
  return (
    <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
      <Loading />
    </Flex>
  )
}

export default LoadingPage
