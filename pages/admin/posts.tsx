import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import BlogConfig from '../../config/BlogConfig'
import { useAuth } from '../../providers/AuthProvider'
import Post from '../../models/Post'
import { useEffect, useState } from 'react'
import SpinnerLoading from '../../components/SpinnerLoading'
import AdminPageWrapper from '../../components/AdminPageWrapper'
import PostCard from '../../components/PostCard'

export default function AdminManagePostsPage() {
  const title = `Manage Posts`
  const { user, isUserFetched } = useAuth()
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [isPostsFetched, setPostsFetched] = useState(false)

  useEffect(() => {
    if (isUserFetched && !user) {
      Router.push('/login')
      return
    }
  }, [isUserFetched, user])

  useEffect(() => {
    async function fetchAllPosts() {
      const fetchedPosts = await BlogConfig.POST_SERVICE.getAllPosts()
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
          <div className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'>
            {posts.map((post) => (
              <PostCard post={post} url={`/admin/posts/${post.slug}`} />
            ))}
          </div>
        ) : (
          <SpinnerLoading />
        )}
      </>
    </AdminPageWrapper>
  )
}
