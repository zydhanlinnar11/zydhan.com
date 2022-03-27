import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import { useUserState } from '@/common/providers/UserProvider'
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
    disableComment?: boolean
    openGraphImage?: StaticImageData
  }
}

const CommentSection = dynamic(
  async () => await import('../Comment/CommentSection')
)

const PostLayout: FC<Props> = ({
  children,
  meta: {
    createdAt,
    description,
    slug,
    title,
    author,
    disableComment,
    openGraphImage,
  },
}) => {
  const userState = useUserState()

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

        {openGraphImage && (
          <>
            <meta property="og:description" content={description} />
            <meta property="og:image" content={openGraphImage.src} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="600" />
            <meta property="og:image:alt" content={`${title} OpenGraph`} />

            <meta name="twitter:image:src" content={openGraphImage.src} />
          </>
        )}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Blog`} />
        <meta property="twitter:description" content={description} />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
      ></link>

      <div className="w-full lg:max-w-5xl mx-auto pt-8 pb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mt-3 flex gap-x-2">
          <p className="text-sm text-gray-400">{createdAt}</p>
          <p className="text-sm text-gray-400">•</p>
          <p className="text-sm text-gray-400">Posted by {author}</p>
          {userState.state === 'authenticated' && userState.user.admin && (
            <>
              <p className="text-sm text-gray-400">•</p>
              <a
                className="text-sm text-gray-400"
                href={`/og-image/blog-post?title=${title}&description=${description}&date=${createdAt}`}
              >
                Generate OpenGraph
              </a>
            </>
          )}
        </div>
      </div>
      {/* <div className="mt-16 flex grow w-full 2xl:pl-[17.5rem] mx-auto gap-x-4 justify-center"> */}
      <div
        id="post-content"
        className="flex justify-between w-full lg:max-w-5xl mx-auto my-4"
      >
        <article className="prose dark:prose-invert max-w-full lg:max-w-[650px] mx-auto lg:mx-0 scroll-pt-[108px]">
          {/* <Header
            topText={createdAt}
            midText={title}
            bottomText={description}
          /> */}
          {children}
        </article>
        <TableOfContent />
      </div>
      {!disableComment && (
        <div className="py-4">
          <CommentSection slug={slug} />
        </div>
      )}
      {/* </div> */}
    </NarrowPageContainer>
  )
}

export default PostLayout
