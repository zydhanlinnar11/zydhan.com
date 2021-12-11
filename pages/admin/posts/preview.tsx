import Head from 'next/head'
import BlogConfig from '../../../config/BlogConfig'
import Post from '../../../models/Post'
import ReactMarkdown from 'react-markdown'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import styles from '../../../styles/PostPage.module.css'
import Header from '../../../components/Header'

import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import FullWidthButton from '../../../components/Button/FullWidthButton'

export default function PostPage() {
  const router = useRouter()
  const title: string = router.query.title as string
  const description: string = router.query.description as string
  const markdown: string = router.query.markdown as string
  const slug: string | null = router.query.slug as string
  const createdAt: string | null = router.query.createdAt as string

  function continueEditHandler() {
    const query: {
      title: string
      description: string
      markdown: string
    } = {
      title,
      description,
      markdown,
    }

    Router.replace({
      pathname: `/admin/posts/${slug ?? 'create'}`,
      query,
    })
  }

  return (
    <div>
      <Head>
        <title>
          {title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta
          name='description'
          content={description ?? BlogConfig.BLOG_DESC}
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <article>
        <Header
          topText={new Date(createdAt ?? new Date()).toLocaleDateString(
            undefined,
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }
          )}
          midText={title}
          bottomText={description ?? BlogConfig.BLOG_DESC}
        >
          <div className='sm:w-48 mx-auto'>
            {/* <Link href={`/admin/posts/${slug ?? 'create'}`}>
              <a className='my-auto inline-block w-full'>Continue edit</a>
            </Link> */}
            <FullWidthButton type='button' onClick={continueEditHandler}>
              Continue edit
            </FullWidthButton>
          </div>
        </Header>
        <div className='text-center mx-auto'>
          <div className='bg-white/[0.24] h-px w-full'></div>
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
              {markdown ?? 'Content not available'}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  )
}
