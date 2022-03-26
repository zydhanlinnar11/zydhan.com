import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import Head from 'next/head'
import { FC } from 'react'
import HomePosts from '../data/HomePosts'
import HomePost from '../types/HomePost'
import PostCard from './PostCard'

export type Post = {
  title: string
  cover_url: string
  slug: string
  created_at: string
}

type Props = {
  posts: HomePost[]
}

const description = "Welcome to Zydhan Linnar Putra's Blog"
const title = 'Blog - zydhan.xyz'

const PostListPage: FC<Props> = ({ posts }) => {
  return (
    <NarrowPageContainer>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:url" content={'https://zydhan.xyz/blog'} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Cartoonized photo of Zydhan" />

        <meta name="twitter:image:src" content="/logo.webp" />
        <meta name="twitter:title" content={title} />
      </Head>
      <header className="p-3 flex flex-col gap-y-3">
        <h1 className="text-3xl font-medium">Blog</h1>
        <p className="dark:text-gray-300">
          Here is some articles focused on web development.
        </p>
      </header>
      <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 py-8 px-3">
        {posts.map((post) => (
          <PostCard
            post={post}
            href={`/blog/posts/${post.slug}`}
            key={post.slug}
          />
        ))}
      </div>
    </NarrowPageContainer>
  )
}

export default PostListPage

export const getStaticProps = () => {
  const posts = HomePosts

  return {
    props: {
      posts,
    },
  }
}
