import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import ServerErrorIcon from '@/common/components/Pages/ServerErrorPage/ServerErrorIcon'

const BadRequestPage = () => {
  return (
    <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
      <Flex marginX={'auto'}>
        <ServerErrorIcon />
      </Flex>
      <Heading as={'h1'}>400 - Bad Request</Heading>
      <Text>Sorry, but system doesn&apos;t know what is your request.</Text>
      <Link href={'/'}>
        <Button>Back to Home Page</Button>
      </Link>
    </Flex>
  )
}

export default BadRequestPage
