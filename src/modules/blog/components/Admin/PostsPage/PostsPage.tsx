import AdminRoute from '@/modules/blog/components/Admin/AdminRoute'
import Header from '@/components/Header'
import Head from 'next/head'
import useAdminPosts from '@/modules/blog/hooks/useAdminPosts'
import Loading from '@/components/FullscreenLoading'
import PostCard from '@/modules/blog/components/PostCard'

const PostsPage = () => {
  const { posts, error } = useAdminPosts()

  return (
    <AdminRoute>
      <>
        <Head>
          <title>Admin Dashboard - Blog - zydhan.xyz</title>
        </Head>
        <>
          <Header midText="Posts" />
          {!error && posts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
