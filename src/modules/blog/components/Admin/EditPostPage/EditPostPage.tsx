import AdminRoute from '@/modules/blog/components/Admin/AdminRoute'
import Header from '@/components/Header'
import Head from 'next/head'
import Form from '../Form/PostForm'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import Button from '@/common/components/Button'
import editPostHandler from './editPostHandler'
import useAdminPost from '@/modules/blog/hooks/useAdminPost'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Modal from '@/common/components/Modal'
import deletePostHandler from './deletePostHandler'

const visibilities = [
  { id: 1, name: 'Visible' },
  { id: 2, name: 'Unlisted' },
  { id: 3, name: 'Private' },
]

const EditPostPage = () => {
  const router = useRouter()
  const { post, error, loading } = useAdminPost()

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [visibility, setVisibility] = useState(
    post ? visibilities[post.visibility] : visibilities[0]
  )
  const [isProcessing, setProcessing] = useState(false)
  const [isDeleteModalShowed, setDeleteModalShowed] = useState(false)

  useEffect(() => {
    if (loading) toast('Loading post', { theme: 'dark' })
    if (error) toast('Error when loading post', { theme: 'dark' })
    if (!loading && !error && post)
      toast.success('Successfully load post', { theme: 'dark' })
  }, [loading, error, post])

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setProcessing(true)
    editPostHandler(
      `${router.query.id}`,
      visibility.id,
      titleRef.current?.value,
      descriptionRef.current?.value,
      markdownRef.current?.value
    ).finally(() => setProcessing(false))
  }

  const deleteHandler = () => {
    setProcessing(true)
    deletePostHandler(`${router.query.id}`, router).finally(() =>
      setProcessing(false)
    )
  }

  return (
    <AdminRoute>
      <>
        <Modal
          bodyText="Are you sure want to delete this post? This action is irreversible."
          title="Delete post?"
          handleClose={() => setDeleteModalShowed(false)}
          isShowed={isDeleteModalShowed}
          action={{ handler: deleteHandler, text: 'Delete', type: 'danger' }}
        />
        <Head>
          <title>Edit Post - Blog - zydhan.xyz</title>
        </Head>
        <>
          <Header midText="Edit post" />
          <form
            className="px-12 flex flex-col gap-y-5"
            onSubmit={submitHandler}
          >
            <Form
              {...{
                titleRef,
                descriptionRef,
                markdownRef,
                visibility,
                setVisibility,
                visibilities,
                post,
              }}
            />
            <>
              <Button type="submit" disabled={isProcessing}>
                Edit post
              </Button>
              <Button
                type="button"
                disabled={isProcessing}
                onClick={() => setDeleteModalShowed(true)}
              >
                Delete post
              </Button>
            </>
          </form>
        </>
      </>
    </AdminRoute>
  )
}

export default EditPostPage