import AnchorLink from '@/common/components/AnchorLink'
import Button from '@/common/components/Button'
import TextArea from '@/common/components/Form/TextArea'
import config from '@/common/config'
import { useUserState } from '@/common/providers/UserProvider'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import Comment from '@/modules/blog/types/admin/Comment'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { FC, FormEvent, RefObject, useRef } from 'react'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'

type Props = {
  slug: string
  mutate: KeyedMutator<Comment[]>
}

const loginFirst = (slug: string) => (
  <p className="text-center mt-12 mb-6">
    <AnchorLink
      href={`/auth/login?next=${encodeURIComponent(
        config.baseUrl + `/blog/posts/${slug}#add-new-comment`
      )}`}
    >
      Log in
    </AnchorLink>{' '}
    to add comment.
  </p>
)

const addNewComment = (
  newCommentSubmitHandler: (e: FormEvent) => Promise<void>,
  commentRef: RefObject<HTMLTextAreaElement>
) => (
  <form onSubmit={newCommentSubmitHandler} id="add-new-comment">
    <TextArea
      className="h-36 mt-6"
      placeholder="Write comment here, markdown styling is supported"
      ref={commentRef}
    />
    <div className="sm:w-48 ml-auto mt-3">
      <Button>Post comment</Button>
    </div>
  </form>
)

const NewCommentSection: FC<Props> = ({ slug, mutate }) => {
  const userState = useUserState()
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const newCommentSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const comment = commentRef.current?.value
    if (!comment) {
      toast.error("Comment can't be empty.", { theme: 'dark' })
      return
    }
    try {
      await axiosAPI.post(`/blog/posts/${slug}/comments`, { comment })
      await mutate()
      await router.push('#comments-section')
      toast.success('Comment added successfully!', {
        theme: 'dark',
      })
      commentRef.current.value = ''
    } catch (e) {
      if (!(e instanceof AxiosError)) throw e
      toast.error(e.response?.data?.message || e.message, { theme: 'dark' })
    }
  }

  return (
    <>
      <h3 className="text-xl font-medium mb-4 mt-6">Add new comment</h3>
      {userState.state === 'authenticated'
        ? addNewComment(newCommentSubmitHandler, commentRef)
        : loginFirst(slug)}
    </>
  )
}

export default NewCommentSection
