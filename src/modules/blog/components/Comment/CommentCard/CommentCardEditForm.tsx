import Button from '@/common/components/Button'
import TextArea from '@/common/components/Form/TextArea'
import Comment from '@/modules/blog/types/admin/Comment'
import React, { FC, FormEvent, useRef } from 'react'

interface Props {
  comment: Comment
  closeHandler: React.MouseEventHandler<HTMLButtonElement>
}

const editHandler = async (
  e: FormEvent<HTMLFormElement>,
  commentId: string
) => {}

const CommentCardEditForm: FC<Props> = ({
  comment: { comment, id },
  closeHandler,
}) => {
  const commentRef = useRef<HTMLTextAreaElement>(null)

  return (
    <form onSubmit={(e) => editHandler(e, id)}>
      <p className="text-lg font-medium px-1">Edit comment</p>
      <div className="mt-3 relative rounded-md shadow-sm">
        <TextArea
          className="block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-3 rounded-md h-36 bg-transparent border border-white/[0.24]"
          placeholder="Write comment here, markdown styling is supported"
          defaultValue={comment}
          ref={commentRef}
        />
      </div>
      <div className="sm:w-96 ml-auto flex gap-x-3 gap-y-1 flex-col sm:flex-row">
        <Button type="button" onClick={closeHandler}>
          Cancel
        </Button>
        <Button type="submit">Edit</Button>
      </div>
    </form>
  )
}

export default CommentCardEditForm
