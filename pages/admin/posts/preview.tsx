import AdminPageWrapper from '@blog-components/AdminPageWrapper'
import FullWidthButton from '@blog-components/Button/FullWidthButton'
import Header from '@blog-components/Header'
import BlogConfig from '@blog-config/BlogConfig'
import dynamic from 'next/dynamic'
import Head from 'next/head'
const PostMarkdownContent = dynamic(
  () => import('@blog-components/PostMarkdownContent')
)

import Router, { useRouter } from 'next/router'

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
    <AdminPageWrapper title={title}>
      <div>
        <Head>
          <title>
            {title} - {BlogConfig.BLOG_TITLE}
          </title>
          <meta
            name='description'
            content={description ?? BlogConfig.BLOG_DESC}
          />
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
            <div className='w-48 mx-auto'>
              <FullWidthButton type='button' onClick={continueEditHandler}>
                Continue edit
              </FullWidthButton>
            </div>
          </Header>
          <div className='text-center mx-auto'>
            <div className='bg-white/[0.24] h-px w-full'></div>
            <PostMarkdownContent markdown={markdown}></PostMarkdownContent>
          </div>
        </article>
      </div>
    </AdminPageWrapper>
  )
}