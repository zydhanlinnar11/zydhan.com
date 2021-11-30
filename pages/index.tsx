import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogConfig from '../config/BlogConfig'
import Post from '../models/Post'

export default function Home({ posts }: { posts: Post[] }) {
  const title = `Home`

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
      <Navbar />
      <main>
        <header
          className='flex flex-col min-h-24 my-16 text-center mx-auto'
          style={{
            maxWidth: '980px',
            paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
            paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
          }}
        >
          <h1 className='text-4xl font-bold'>{BlogConfig.BLOG_TITLE}</h1>
          <h2 className='text-lg font-bolder my-2 text-gray-400 text-center'>
            {BlogConfig.BLOG_DESC}
          </h2>
        </header>
        <div
          className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'
          style={{
            maxWidth: '980px',
            paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
            paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
          }}
        >
          {posts.map((post) => (
            <Link href={`/post/${post.slug}`} key={post.slug}>
              <a
                key={post.slug}
                className='h-72 rounded-lg max-w-xs w-full mx-auto'
                style={{ border: '1px solid rgba(255, 255, 255, 0.24)' }}
              >
                <article className='h-full flex flex-col'>
                  <div className='h-32 block w-full relative'>
                    <Image
                      src={post.coverUrl}
                      alt={`${post.slug}-image`}
                      className='rounded-t-lg'
                      layout='fill'
                      objectFit='cover'
                      priority={true}
                    />
                  </div>
                  <div className='text-left p-6 flex flex-col justify-between flex-auto'>
                    <div>
                      <h3 className='font-bold text-lg'>{post.title}</h3>
                    </div>
                    <p className='text-gray-400 font-semibold text-sm'>
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </article>
              </a>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
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
