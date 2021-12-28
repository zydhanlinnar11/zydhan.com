import Router from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@blog-providers/AuthProvider'
import Post from '@blog-models/Post'
import BlogConfig from '@blog-config/BlogConfig'
import AdminPageWrapper from '@blog-components/AdminPageWrapper'
import ThreeColumnGrid from '@blog-components/ThreeColumnGrid'
import PostCard from '@blog-components/PostCard'
import SpinnerLoading from '@blog-components/SpinnerLoading'

export default function AdminManagePostsPage() {
  const title = `Manage Posts`
  const { user, isUserFetched } = useAuth()
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [isPostsFetched, setPostsFetched] = useState(false)

  useEffect(() => {
    if (isUserFetched && !user) {
      Router.replace('/login')
      return
    }
  }, [isUserFetched, user])

  useEffect(() => {
    async function fetchAllPosts() {
      const fetchedPosts = await BlogConfig.POST_SERVICE.getAllPosts(true)
      setPosts(fetchedPosts)
      setPostsFetched(true)
    }
    fetchAllPosts()
  }, [])

  return (
    <AdminPageWrapper title={title}>
      <>
        <header className='flex flex-col min-h-24 my-16 text-center mx-auto'>
          <h1 className='text-4xl font-bold'>{title}</h1>
          <div className='flex justify-center rounded-md border-2 border-opacity-50 border-gray-600 w-full h-10 mt-5 hover:bg-blue-600 hover:bg-opacity-30 transition-colors duration-100 focus:bg-blue-900 focus:bg-opacity-30 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed'>
            <Link href='/admin/posts/create'>
              <a className='my-auto inline-block w-full'>Create post</a>
            </Link>
          </div>
        </header>
        {isPostsFetched ? (
          <ThreeColumnGrid>
            {posts.map((post) => (
              <PostCard
                post={post}
                url={`/admin/posts/${post.slug}`}
                key={post.slug}
              />
            ))}
          </ThreeColumnGrid>
        ) : (
          <SpinnerLoading />
        )}
      </>
    </AdminPageWrapper>
  )
}
