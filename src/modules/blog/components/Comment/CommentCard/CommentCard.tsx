import React, { MouseEventHandler, useState } from 'react'
import Image from 'next/image'
import Comment from '@/modules/blog/types/admin/Comment'
import Markdown from '../../Markdown'
import CommentCardMenu from './CommentCardMenu'
import CommentCardEditForm from './CommentCardEditForm'
import { KeyedMutator } from 'swr'

interface Props {
  comment: Comment
  mutate: KeyedMutator<Comment[]>
}

function CommentCard({ comment, mutate }: Props) {
  const { createdAt, id, is_own_comment, user_name } = comment
  const [isEditing, setIsEditing] = useState(false)

  const deleteHandler: MouseEventHandler<HTMLButtonElement> = () => {}

  return (
    <li className="w-full border border-white/20 rounded px-5 py-3">
      <div className="flex justify-between">
        <div className="w-full flex gap-3 mb-3">
          <div className="h-10 w-10 bg-white rounded-full shrink-0 my-auto">
            <Image
              className="rounded-full shrink-0 my-auto"
              width={40}
              height={40}
              src={`https://avatars.dicebear.com/api/human/${id}.svg`}
              alt={`Profile picture of ${user_name}`}
            ></Image>
          </div>
          <div className="my-auto">
            <p className="text-sm">{user_name}</p>
            <p className="text-xs text-gray-400">{createdAt}</p>
          </div>
        </div>
        {is_own_comment && (
          <CommentCardMenu
            handleEdit={() => setIsEditing(true)}
            handleDelete={deleteHandler}
          />
        )}
      </div>
      {isEditing ? (
        <CommentCardEditForm
          comment={comment}
          closeHandler={() => setIsEditing(false)}
          mutate={mutate}
        />
      ) : (
        <Markdown markdown={comment.comment} />
      )}
    </li>
  )
}

export default CommentCard
