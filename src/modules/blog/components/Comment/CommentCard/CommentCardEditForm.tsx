import Button from '@/common/components/Button'
import TextArea from '@/common/components/Form/TextArea'
import Comment from '@/modules/blog/types/admin/Comment'
import React, { FC, FormEvent, useRef, useState } from 'react'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import { toast } from 'react-toastify'
import { KeyedMutator } from 'swr'
import { AxiosError } from 'axios'

interface Props {
  comment: Comment
  closeHandler: () => void
  mutate: KeyedMutator<Comment[]>
}

const CommentCardEditForm: FC<Props> = ({
  comment: { comment, id },
  closeHandler,
  mutate,
}) => {
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const editHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsProcessing(true)
      const comment = commentRef.current?.value
      if (!comment) {
        toast.error('The comment field is required!', { theme: 'dark' })
        return
      }
      await axiosAPI.patch(`/blog/comments/${id}`, { comment })
      await mutate()
      toast.success('Successfully edited comment!', { theme: 'dark' })
      closeHandler()
    } catch (e) {
      if (!(e instanceof AxiosError)) throw e
      toast.error(e.response?.data?.message || e.message, { theme: 'dark' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={editHandler}>
      <p className="text-lg font-medium px-1">Edit comment</p>
      <div className="mt-3 relative rounded-md shadow-sm">
        <TextArea
          className="block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-3 rounded-md h-36 bg-transparent border border-white/[0.24]"
          placeholder="Write comment here, markdown styling is supported"
          defaultValue={comment}
          ref={commentRef}
        />
      </div>
      <div className="sm:w-96 ml-auto flex gap-x-3 gap-y-1 flex-col sm:flex-row mt-3">
        <Button type="button" onClick={closeHandler}>
          Cancel
        </Button>
        <Button type="submit" disabled={isProcessing}>
          Edit
        </Button>
      </div>
    </form>
  )
}

export default CommentCardEditForm
