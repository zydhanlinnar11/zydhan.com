import React from 'react'
import Image from 'next/image'
import Comment from '@/modules/blog/types/admin/Comment'
import Markdown from '../../Markdown'
import CommentCardMenu from './CommentCardMenu'

interface Props {
  comment: Comment
}

function CommentCard({
  comment: { comment, user_name, id, createdAt, is_own_comment },
}: Props) {
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
        {is_own_comment && <CommentCardMenu />}
      </div>
      <Markdown markdown={comment} />
    </li>
  )
}

export default CommentCard
