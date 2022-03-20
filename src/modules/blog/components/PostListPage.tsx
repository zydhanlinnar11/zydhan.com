import Header from '@/common/components/Header'
import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import config from '@/common/config'
import { useUserState } from '@/common/providers/UserProvider'
import axios, { AxiosResponse } from 'axios'
import Head from 'next/head'
import PostCard from './PostCard'

export type Post = {
  title: string
  cover_url: string
  slug: string
  created_at: string
}

const description = "Welcome to Zydhan Linnar Putra's Blog"
const title = 'Blog - zydhan.xyz'

const PostListPage = ({ posts }: { posts: Post[] }) => {
  const userState = useUserState()

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
      <Header
        midText="Zydhan's Blog"
        bottomText={`Welcome, ${
          userState.state === 'authenticated' ? userState.user.name : 'guest'
        }! Have fun here.`}
      />
      {posts?.length > 0 ? (
        <div className="text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14">
          {posts.map((post) => (
            <PostCard
              post={post}
              href={`/blog/posts/${post.slug}`}
              key={post.slug}
            />
          ))}
        </div>
      ) : (
        <div className="my-auto">
          <Header
            midText="No post available"
            bottomText="There are currently no posts, or the server is under maintenance."
          ></Header>
        </div>
      )}
    </NarrowPageContainer>
  )
}

export async function getStaticProps() {
  const response = await axios.get<any, AxiosResponse<Post[], any>, any>(
    `${config.apiUrl}/blog/posts`
  )
  const posts = response.data

  return { props: { posts } }
}

export default PostListPage
