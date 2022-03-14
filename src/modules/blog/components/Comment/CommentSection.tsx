import SpinnerLoading from '@/common/components/SpinnerLoading'
import React, { FC } from 'react'
import { Post } from '../ViewPostPage'
import CommentCard from './CommentCard'
import NewCommentSection from './NewCommentSection'
import useComments from './useComments'

type Props = {
  post: Post
}

const CommentSection: FC<Props> = ({ post }) => {
  const { slug } = post
  const { comments, isError, isLoading, mutate } = useComments(slug)

  return (
    <section
      className="text-left px-2 pb-8
    target:before:content-[''] target:before:h-14 target:before:block target:before:-mt-14"
      id="comments-section"
    >
      <h2 className="border-b border-b-white/[0.24] mb-4 text-2xl pb-2 font-medium">
        Comments
      </h2>
      {isLoading && <SpinnerLoading />}
      {(isError || !comments) && (
        <p className="text-center my-12">
          I'm sorry, but i can't load all comments for now 😢
        </p>
      )}
      {comments &&
        (comments.length > 0 ? (
          <ul className="mb-3 flex flex-col gap-5">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p className="text-center my-12">
            There are currently no comments. Feel free to comment on this post.
            I would love to hear your views on my blog! 😁
          </p>
        ))}
      <NewCommentSection {...{ mutate, slug }} />
    </section>
  )
}

export default CommentSection
