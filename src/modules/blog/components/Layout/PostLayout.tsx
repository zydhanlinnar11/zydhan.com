import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC } from 'react'
import TableOfContent from '../TableOfContent'

type Props = {
  meta: {
    slug: string
    description: string
    createdAt: string
    title: string
    author: string
  }
}

const CommentSection = dynamic(
  async () => await import('../Comment/CommentSection')
)

const PostLayout: FC<Props> = ({
  children,
  meta: { createdAt, description, slug, title, author },
}) => {
  return (
    <NarrowPageContainer>
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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
      ></link>

      <div className="w-full lg:max-w-5xl mx-auto pt-8 pb-8 px-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="mt-3 flex gap-x-2">
          <p className="text-sm text-gray-400">{createdAt}</p>
          <p className="text-sm text-gray-400">•</p>
          <p className="text-sm text-gray-400">Posted by {author}</p>
        </div>
      </div>
      {/* <div className="mt-16 flex grow w-full 2xl:pl-[17.5rem] mx-auto gap-x-4 justify-center"> */}
      <div
        id="post-content"
        className="flex justify-between w-full lg:max-w-5xl mx-auto my-4"
      >
        <article className="prose dark:prose-invert max-w-full lg:max-w-[650px] px-8 mx-auto lg:mx-0 scroll-pt-[108px]">
          {/* <Header
            topText={createdAt}
            midText={title}
            bottomText={description}
          /> */}
          {children}
        </article>
        <TableOfContent />
      </div>
      <div className="px-4 py-4">
        <CommentSection slug={slug} />
      </div>
      {/* </div> */}
    </NarrowPageContainer>
  )
}

export default PostLayout
