import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import BlogConfig from '../../config/BlogConfig'
import { useAuth } from '../../providers/AuthProvider'
import Post from '../../models/Post'
import { useEffect, useState } from 'react'
import SpinnerLoading from '../../components/SpinnerLoading'
import AdminPageWrapper from '../../components/AdminPageWrapper'

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
              <Link href={`/admin/posts/${post.slug}`} key={post.slug}>
                <a
                  key={post.slug}
                  className='h-72 rounded-lg max-w-xs w-full mx-auto'
                  style={{ border: '1px solid rgba(255, 255, 255, 0.24)' }}
                >
                  <article className='h-full flex flex-col'>
                    <div className='h-32 block w-full relative'>
                      <Image
                        src={post.coverUrl}
                        alt={`${post.slug}-image`}
                        className='rounded-t-lg'
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                        sizes='960px'
                      />
                    </div>
                    <div className='text-left p-6 flex flex-col justify-between flex-auto'>
                      <div>
                        <h3 className='font-bold text-lg'>{post.title}</h3>
                      </div>
                      <p className='text-gray-400 font-semibold text-sm'>
                        {new Date(post.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                  </article>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <SpinnerLoading />
        )}
      </>
    </AdminPageWrapper>
  )
}
