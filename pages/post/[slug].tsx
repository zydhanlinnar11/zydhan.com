import Head from 'next/head'
import BlogConfig from '../../config/BlogConfig'
import Post from '../../models/Post'
import ReactMarkdown from 'react-markdown'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from '../../styles/PostPage.module.css'
import Header from '../../components/Header'
import rehypeRaw from 'rehype-raw'

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
      <article>
        <Header
          topText={new Date(post.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          midText={post.title}
          bottomText={post.description ?? BlogConfig.BLOG_DESC}
        />
        <div className='text-center mx-auto'>
          <div className='bg-white/[0.24] h-px w-full'></div>
          <div className='py-4 text-left' id={styles.postContent}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={materialOceanic}
                      language={match[1]}
                      customStyle={{
                        borderRadius: '0.375rem',
                      }}
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
