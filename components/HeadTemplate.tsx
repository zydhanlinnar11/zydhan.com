import Head from 'next/head'
import BlogConfig from '../config/BlogConfig'

interface HeadTemplateProps {
  title: string
  description?: string
  url?: string
}

export default function HeadTemplate({
  title,
  description = BlogConfig.BLOG_DESC,
  url = BlogConfig.BLOG_DOMAIN,
}: HeadTemplateProps) {
  return (
    <Head>
      <title>
        {title} - {BlogConfig.BLOG_TITLE}
      </title>
      <meta name='description' content={BlogConfig.BLOG_DESC} />
      <meta property='og:title' content={title} />
      <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
      <meta property='og:description' content={description} />
    </Head>
  )
}
