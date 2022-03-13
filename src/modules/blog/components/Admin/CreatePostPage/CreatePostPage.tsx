import AdminRoute from '@/modules/blog/components/Admin/AdminRoute'
import Header from '@/components/Header'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Form from '../Form/PostForm'
import { FormEventHandler, useRef, useState } from 'react'
import Button from '@/common/components/Button'
import createPostHandler from './createPostHandler'

const visibilities = [
  { id: 1, name: 'Visible' },
  { id: 2, name: 'Unlisted' },
  { id: 3, name: 'Private' },
]

const CreatePostPage = () => {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [visibility, setVisibility] = useState(visibilities[0])
  const [isProcessing, setProcessing] = useState(false)

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setProcessing(true)
    createPostHandler(
      visibility.id,
      router,
      titleRef.current?.value,
      descriptionRef.current?.value,
      markdownRef.current?.value
    ).finally(() => setProcessing(false))
  }

  return (
    <AdminRoute>
      <>
        <Head>
          <title>Create Post - Blog - zydhan.xyz</title>
        </Head>
        <>
          <Header midText="Create post" />
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
              }}
            />
            <>
              <Button type="submit" disabled={isProcessing}>
                Create post
              </Button>
            </>
          </form>
        </>
      </>
    </AdminRoute>
  )
}

export default CreatePostPage
