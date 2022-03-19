import Header from '@/common/components/Header'
import SpinnerLoading from '@/common/components/SpinnerLoading'
import axios, { AxiosResponse } from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import CommentSection from './Comment/CommentSection'
import Markdown from './Markdown'

export type Post = {
  title: string
  slug: string
  markdown: string
  description: string
  createdAt: string
}

export default function PostPage({ post }: { post: Post }) {
  const { title, slug, createdAt, description, markdown } = post

  return (
    <>
      <Head>
        <title>{title} - Blog - zydhan.xyz</title>
        <meta property="og:title" content={`${title} - Blog`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://zydhan.xyz/blog/posts/${slug}`}
        />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://zydhan.xyz/api/og-image/blog-post?title=${title}&description=${description}&date=${createdAt}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={`${title} OpenGraph`} />

        <meta
          name="twitter:image:src"
          content={`https://zydhan.xyz/api/og-image/blog-post?title=${title}&description=${description}&date=${createdAt}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Blog`} />
        <meta property="twitter:description" content={description} />
      </Head>

      <article className="flex flex-col mx-auto grow w-full max-w-5xl px-6">
        <Header topText={createdAt} midText={title} bottomText={description} />
        <div className="text-center mx-auto max-w-full">
          <div className="bg-black/[0.24] dark:bg-white/[0.24] h-px w-full"></div>
          <Markdown markdown={markdown} allowHTML={true}></Markdown>
          <CommentSection post={post}></CommentSection>
        </div>
      </article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (req) => {
  if (typeof req.params?.['slug'] !== 'string')
    return {
      notFound: true,
    }
  const slug = req.params?.['slug']

  let post: Post

  try {
    const response = await axios.get<any, AxiosResponse<Post, any>>(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}`
    )
    post = response.data
  } catch (e) {
    if (axios.isAxiosError(e)) console.log(e.response?.data)
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/posts`
  )
  const posts = response.data

  let paths: { params: { slug: string } }[] = []
  posts.forEach(({ slug }: { slug: string }) => {
    paths.push({ params: { slug } })
  })

  return {
    fallback: 'blocking',
    paths,
  }
}
