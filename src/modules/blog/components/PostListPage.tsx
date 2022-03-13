import Header from '@/common/components/Header'
import { useUserState } from '@/common/providers/UserProvider'
import axios, { AxiosResponse } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PostCard from './PostCard'

export type Post = {
  title: string
  cover_url: string
  slug: string
  created_at: string
}

type Response = {
  status: 'success'
  data: Post[]
}

const PostListPage = ({ posts }: { posts: Post[] }) => {
  const userState = useUserState()

  return (
    <div className="flex flex-col mx-auto grow w-full max-w-5xl px-6">
      <Head>
        <title>Blog - zydhan.xyz</title>
        <meta property="og:title" content="Blog - zydhan.xyz" />
        <meta property="og:url" content={'https://zydhan.xyz/blog'} />
        <meta property="og:description" content="Welcome to My Blog" />
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
    </div>
  )
}

export async function getStaticProps() {
  const response = await axios.get<any, AxiosResponse<Response, any>, any>(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/posts`
  )
  const responseData = response.data
  const posts = responseData.data

  return { props: { posts } }
}

export default PostListPage
