import { FC, PropsWithChildren } from 'react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import {
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react'
import Head from 'next/head'
import TableOfContent from './TableOfContent'
import { NextSeo } from 'next-seo'
import { config } from '@/common/config'

type Props = {
  author: string
  description: string
  createdAt: string
  title: string
}

const PostDetail: FC<PropsWithChildren<Props>> = ({
  children,
  author,
  createdAt,
  description,
  title,
}) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        ></link>
      </Head>
      <NextSeo
        title={`${title} – Blog`}
        openGraph={{
          url: `${config.frontendUrl}/blog/posts`,
          description: description,
          title: `${title} – Blog`,
        }}
        description={description}
      />
      <Grid
        as={'article'}
        templateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
        columnGap={'16'}
      >
        <GridItem colSpan={2}>
          <VStack alignItems={'start'}>
            <Heading as={'h1'}>{title}</Heading>
            <HStack
              spacing={'2'}
              color={colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700'}
            >
              <Text as={'small'}>{createdAt}</Text>
              <Text as={'small'}>•</Text>
              <Text as={'small'}>Posted by {author}</Text>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <Prose as={'section'} id="post-content">
            {children}
          </Prose>
        </GridItem>
        <GridItem>
          <TableOfContent />
        </GridItem>
      </Grid>
    </>
  )
}

export default PostDetail
