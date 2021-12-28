import AdminPageWrapper from '@blog-components/AdminPageWrapper'
import AddEditPostForm from '@blog-components/Forms/AddEditPost'
import SpinnerLoading from '@blog-components/SpinnerLoading'
import BlogConfig from '@blog-config/BlogConfig'
import Post from '@blog-models/Post'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EditPostPage() {
  const pageTitle = 'Edit Post'
  const { slug } = useRouter().query
  const [post, setPost] = useState<Post | null>(null)
  const [isPostFetched, setPostFetched] = useState(false)

  useEffect(() => {
    if (typeof slug === 'string') {
      BlogConfig.POST_SERVICE.getSinglePost(slug, true)
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
        <h2 className='text-lg my-2 text-gray-400'>{post?.title}</h2>
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
