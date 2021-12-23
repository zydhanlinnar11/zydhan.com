import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import PostCard from '../components/PostCard'
import Header from '../components/Header'
import CenteredErrorMessage from '../components/CenteredErrorMessage'
import HeadTemplate from '../components/HeadTemplate'

interface Post {
  title: string
  slug: string
  createdAt: string
  coverUrl: string
}

function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'>
      {posts.map((post) => (
        <PostCard post={post} url={`/post/${post.slug}`} key={post.slug} />
      ))}
    </div>
  )
}

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
        <PostGrid posts={posts}></PostGrid>
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
