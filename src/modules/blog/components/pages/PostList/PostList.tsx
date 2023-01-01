import { Heading, VStack, Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaRegSadTear } from 'react-icons/fa'
import { getMetadataAllPosts } from '@/blog/lib/api'
import PostCard from '@/blog/components/PostCard'
import { Grid, GridItem } from '@chakra-ui/react'
import { PostMetadata } from '@/blog/types/PostMetadata'

type Props = {
  posts: PostMetadata[]
}

const PostList: FC<Props> = ({ posts }) => {
  return (
    <VStack alignItems={'start'}>
      <Heading as={'h1'}>Blog</Heading>
      <Text fontWeight={'semibold'}>
        Here is some articles focused on web development.
      </Text>
      {posts.length === 0 && (
        <VStack w={'full'} py={16} spacing={'4'}>
          <Icon as={FaRegSadTear} boxSize={'16'} />
          <Text textAlign={'center'}>
            I&apos;m sorry, but currently we don&apos;t have anything to read.
            📰
          </Text>
          <Text textAlign={'center'}>
            Please come back later and i will bring you good article! ☕
          </Text>
        </VStack>
      )}

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
        py={16}
      >
        {posts.map((post) => (
          <GridItem key={post.slug}>
            <PostCard key={post.slug} postMeta={post} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}

export const getStaticProps = async () => {
  const allPosts = getMetadataAllPosts()

  return {
    props: { posts: allPosts },
  }
}

export default PostList
