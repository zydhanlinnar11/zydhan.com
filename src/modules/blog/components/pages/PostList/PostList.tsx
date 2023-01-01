import { Post } from '@/blog/types/Post'
import { Heading, VStack, Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaRegSadTear } from 'react-icons/fa'
import { getAllPosts } from 'src/pages/blog/lib/api'
import PostCard from '@/blog/components/PostCard'
import { Grid, GridItem } from '@chakra-ui/react'

type Props = {
  posts: Post[]
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
            I'm sorry, but currently we don't have anything to read. 📰
          </Text>
          <Text textAlign={'center'}>
            Please come back later and i will bring you good article! ☕
          </Text>
        </VStack>
      )}

      {posts.map((post) => (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
          py={16}
        >
          <GridItem>
            <PostCard key={post.slug} post={post} />
          </GridItem>
        </Grid>
      ))}
    </VStack>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts()

  return {
    props: { posts: allPosts },
  }
}

export default PostList
