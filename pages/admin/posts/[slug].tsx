import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminPageWrapper from '../../../components/AdminPageWrapper'
import AddEditPostForm from '../../../components/Forms/AddEditPost'
import SpinnerLoading from '../../../components/SpinnerLoading'
import BlogConfig from '../../../config/BlogConfig'
import Post from '../../../interfaces/Post'

export default function EditPostPage() {
  const pageTitle = 'Edit Post'
  const { slug } = useRouter().query
  const [post, setPost] = useState<Post | null>(null)
  const [isPostFetched, setPostFetched] = useState(false)

  useEffect(() => {
    if (typeof slug === 'string') {
      BlogConfig.POST_SERVICE.getSinglePost(slug)
        .then((fetchedPost) => {
          setPost(fetchedPost)
          setPostFetched(true)
        })
        .catch((e) => {
          setPostFetched(true)
        })
    }
  }, [slug])

  return (
    <AdminPageWrapper title={pageTitle}>
      <header className='flex flex-col min-h-24 my-16 text-center mx-auto'>
        <h1 className='text-4xl font-bold'>{pageTitle}</h1>
        <h2 className='text-lg font-bolder my-2 text-gray-400'>
          {post?.title}
        </h2>
      </header>
      {!isPostFetched ? (
        <SpinnerLoading />
      ) : !post ? (
        <p className='mx-auto'>An error occurred.</p>
      ) : (
        <AddEditPostForm post={post} />
      )}
    </AdminPageWrapper>
  )
}
