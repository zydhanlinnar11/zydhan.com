import CenteredErrorMessage from '@blog-components/CenteredErrorMessage'
import Header from '@blog-components/Header'
import HeadTemplate from '@blog-components/HeadTemplate'
import PostCard from '@blog-components/PostCard'
import ThreeColumnGrid from '@blog-components/ThreeColumnGrid'
import BlogConfig from '@blog-config/BlogConfig'
import Post from '@blog-models/Post'
import { useAuth } from '@blog-providers/AuthProvider'

export default function Home({ posts }: { posts: Post[] }) {
  const { user } = useAuth()

  return (
    <div>
      <HeadTemplate title='Home'></HeadTemplate>
      <Header
        midText={BlogConfig.BLOG_TITLE}
        bottomText={`Welcome, ${user ? user.name : 'guest'}! Have fun here.`}
      />
      {posts?.length > 0 ? (
        <ThreeColumnGrid>
          {posts.map((post) => (
            <PostCard post={post} url={`/post/${post.slug}`} key={post.slug} />
          ))}
        </ThreeColumnGrid>
      ) : (
        <CenteredErrorMessage
          header='No post available'
          message='There are currently no posts, or the server is under maintenance.'
        ></CenteredErrorMessage>
      )}
    </div>
  )
}

export async function getStaticProps() {
  let posts: Post[]
  try {
    posts = await BlogConfig.POST_SERVICE.getAllPosts()
  } catch {
    posts = []
  }

  return { props: { posts } }
}
