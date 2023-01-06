import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import NotFoundIcon from './NotFoundIcon'

const NotFoundPage = () => {
  return (
    <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
      <Flex marginX={'auto'}>
        <NotFoundIcon />
      </Flex>
      <Heading as={'h1'}>404 - Page Not Found</Heading>
      <Text>Sorry, we couldn&apos;t find what you&apos;re looking for.</Text>
      <Link href={'/'}>
        <Button>Back to Home Page</Button>
      </Link>
    </Flex>
  )
}

export default NotFoundPage
