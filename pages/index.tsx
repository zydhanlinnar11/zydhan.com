import Head from 'next/head'
import BlogConfig from '../config/BlogConfig'
import Post from '../models/Post'
import { useAuth } from '../providers/AuthProvider'
import PostCard from '../components/PostCard'
import Header from '../components/Header'

export default function Home({ posts }: { posts: Post[] }) {
  const title = `Home`
  const { user } = useAuth()

  return (
    <div>
      <Head>
        <title>
          {title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Header
        midText={BlogConfig.BLOG_TITLE}
        bottomText={
          user ? `Welcome, ${user.name}! Have fun here.` : BlogConfig.BLOG_DESC
        }
      />
      {posts.length > 0 ? (
        <div className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'>
          {posts.map((post) => (
            <PostCard post={post} url={`/post/${post.slug}`} key={post.slug} />
          ))}
        </div>
      ) : (
        <div className='text-center h-48 flex'>
          <div className='m-auto'>
            <h1 className='text-4xl'>Tidak ada pos</h1>
            <p className='mt-3 text-gray-400'>
              Saat ini belum ada pos, atau server sedang maintenance.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      posts: await BlogConfig.POST_SERVICE.getAllPosts(),
    },
  }
}
