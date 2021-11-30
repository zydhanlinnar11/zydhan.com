import Navbar from '../components/Navbar'
import Head from 'next/head'
import BlogConfig from '../config/BlogConfig'
import Post from '../models/Post'

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <Head>
        <title>Home - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Home - ${BlogConfig.BLOG_TITLE}`} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Navbar />
      <main>
        <header className='flex flex-col h-24 my-16 text-center'>
          <h1 className='text-4xl font-bold'>{BlogConfig.BLOG_TITLE}</h1>
          <h2 className='text-lg font-bolder my-2 text-gray-400 text-center'>
            {BlogConfig.BLOG_DESC}
          </h2>
          {posts.map((post) => (
            <p>{post.title}</p>
          ))}
        </header>
      </main>
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
