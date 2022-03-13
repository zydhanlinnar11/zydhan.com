import AdminRoute from '@/modules/blog/components/Admin/AdminRoute'
import Header from '@/components/Header'
import Head from 'next/head'
import useAdminPosts from '@/modules/blog/hooks/useAdminPosts'
import Loading from '@/components/FullscreenLoading'
import PostCard from '@/modules/blog/components/PostCard'
import Button from '@/common/components/Button'
import { useRouter } from 'next/router'

const PostsPage = () => {
  const { posts, error } = useAdminPosts()
  const router = useRouter()

  return (
    <AdminRoute>
      <>
        <Head>
          <title>Admin Dashboard - Blog - zydhan.xyz</title>
        </Head>
        <>
          <Header midText="Posts">
            <div className="w-44">
              <Button
                type="button"
                onClick={() => {
                  router.push('/blog/admin/posts/create')
                }}
              >
                Create post
              </Button>
            </div>
          </Header>
          {!error && posts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <PostCard
                  post={post}
                  href={`/blog/admin/posts/${post.id}`}
                  key={post.slug}
                />
              ))}
            </div>
          ) : (
            <Loading />
          )}
        </>
      </>
    </AdminRoute>
  )
}

export default PostsPage
