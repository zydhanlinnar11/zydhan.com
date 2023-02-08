import { Flex, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import ServerErrorIcon from './ServerErrorIcon'

const ServerErrorPage = () => {
  return (
    <>
      <NextSeo title="Internal Server Error" />
      <Flex my={'auto'} textAlign={'center'} flexDir={'column'} gap={'4'}>
        <Flex marginX={'auto'}>
          <ServerErrorIcon />
        </Flex>
        <Heading as={'h1'}>500 - Internal Server Error</Heading>
        <Text>Sorry, there was an unexpected error...</Text>
        <Text>Don&apos;t worry, we&apos;ll get it over with soon!</Text>
      </Flex>
    </>
  )
}

export default ServerErrorPage
