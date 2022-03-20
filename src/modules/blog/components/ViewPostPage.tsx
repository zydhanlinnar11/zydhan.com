import Header from '@/common/components/Header'
import SpinnerLoading from '@/common/components/SpinnerLoading'
import config from '@/common/config'
import axios, { AxiosResponse } from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import TableOfContent from './TableOfContent'

const Markdown = dynamic(() => import('@/modules/blog/components/Markdown'), {
  loading: () => (
    <div className="min-h-[50vh] flex items-center justify-center">
      <SpinnerLoading />
    </div>
  ),
})

const CommentSection = dynamic(
  () => import('@/modules/blog/components/Comment/CommentSection')
)

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
        <meta name="description" content={description} />

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

      <div className="flex grow w-full 2xl:pl-[17.5rem] mx-auto gap-x-4 justify-center">
        <article className="flex flex-col w-full max-w-5xl px-6">
          <Header
            topText={createdAt}
            midText={title}
            bottomText={description}
          />
          <div className="text-center mx-auto w-full">
            <div className="bg-black/[0.24] dark:bg-white/[0.24] h-px w-full"></div>
            <div id="post-markdown">
              <Markdown markdown={markdown} allowHTML={true}></Markdown>
            </div>
            <CommentSection post={post}></CommentSection>
          </div>
        </article>
        <TableOfContent />
      </div>
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
      `${config.apiUrl}/blog/posts/${slug}`
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
  const response = await axios.get(`${config.apiUrl}/blog/posts`)
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
