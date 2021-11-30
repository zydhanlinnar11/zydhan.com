import Head from 'next/head'
import BlogConfig from '../../config/BlogConfig'
import Post from '../../models/Post'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ReactMarkdown from 'react-markdown'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from '../../styles/PostPage.module.css'

export default function PostPage({ post }: { post: Post }) {
  return (
    <div>
      <Head>
        <title>
          {post.title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta
          name='description'
          content={post.description ?? BlogConfig.BLOG_DESC}
        />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={post.title} />
        <meta
          property='og:url'
          content={`${BlogConfig.BLOG_DOMAIN}/post/${post.slug}`}
        />
        <meta
          property='og:description'
          content={post.description ?? BlogConfig.BLOG_DESC}
        />
      </Head>
      <Navbar />
      <main>
        <article>
          <header
            className='flex flex-col min-h-24 my-16 text-center mx-auto'
            style={{
              maxWidth: '980px',
              paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
              paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
            }}
          >
            <h3 className='text-sm font-bolder my-2 text-gray-400'>
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <h1 className='text-4xl font-bold'>{post.title}</h1>
            <h2 className='text-lg font-bolder my-2 text-gray-400'>
              {post.description ?? BlogConfig.BLOG_DESC}
            </h2>
          </header>
          <div
            className='text-center mx-auto'
            style={{
              maxWidth: '980px',
              paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
              paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
            }}
          >
            <div className='bg-divider-primary h-px w-full'></div>
            <div className='py-4 text-left' id={styles.postContent}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={materialOceanic}
                        language={match[1]}
                        showLineNumbers
                        lineNumberContainerStyle={{ paddingLeft: '0em' }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {post.markdown ?? 'Content not available'}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      post: await BlogConfig.POST_SERVICE.getSinglePost(params.slug),
    },
  }
}

export async function getStaticPaths() {
  const posts = await BlogConfig.POST_SERVICE.getAllPosts()
  const paths = []
  posts.forEach((post) => {
    paths.push({ params: { slug: post.slug } })
  })
  return {
    paths,
    fallback: false,
  }
}
