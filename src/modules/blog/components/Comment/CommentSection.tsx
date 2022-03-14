import AnchorLink from '@/common/components/AnchorLink'
import Button from '@/common/components/Button'
import TextArea from '@/common/components/Form/TextArea'
import { useUserState } from '@/common/providers/UserProvider'
import getBaseURL from '@/common/utils/GetBaseUrl'
import axios from 'axios'
import React, { FC, FormEvent, useRef } from 'react'
import { toast } from 'react-toastify'
import { Post } from '../ViewPostPage'
import CommentCard from './CommentCard'
import useComments from './useComments'

type Props = {
  post: Post
}

const CommentSection: FC<Props> = ({ post }) => {
  const { slug } = post
  const { comments, isError, isLoading, mutate } = useComments(slug)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const userState = useUserState()

  const newCommentSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    const comment = commentRef.current?.value
    if (!comment) {
      toast.error("Comment can't be empty.", { theme: 'dark' })
      return
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${slug}/comments`,
        {
          comment,
        },
        {
          withCredentials: true,
        }
      )
      await mutate()
      toast.success('Comment added successfully!', {
        theme: 'dark',
      })
    } catch (e) {
      if (!axios.isAxiosError(e)) throw e
      toast.error(e.response?.data?.message || e.message, { theme: 'dark' })
    }
  }

  const deleteCommentHandler = async (deletedComment: Comment) => {
    // try {
    //   if (confirm('Are you sure want to delete this comment?')) {
    //     await BlogConfig.COMMENT_SERVICE.deleteComment(deletedComment.id)
    //     setComments((comments) =>
    //       comments.filter((comment) => comment.id !== deletedComment.id)
    //     )
    //   }
    // } catch (e) {}
  }

  const editPostHandler = async (id: string, content: string) => {
    // const newComment = await BlogConfig.COMMENT_SERVICE.editComment(id, content)
    // setComments((prevComments) =>
    //   prevComments.map((comment) => {
    //     if (comment.id === newComment.id) return newComment
    //     return comment
    //   })
    // )
  }

  return (
    <section
      className="text-left px-2 pb-8
    target:before:content-[''] target:before:h-14 target:before:block target:before:-mt-14"
      id="comments-section"
    >
      <h2 className="border-b border-b-white/[0.24] mb-4 text-2xl pb-2 font-medium">
        Comments
      </h2>
      {comments && comments.length > 0 ? (
        <ul className="mb-3 flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentCard
              // deleteHandler={deleteCommentHandler}
              editHandler={editPostHandler}
              key={comment.id}
              comment={comment}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center my-12">
          There are currently no comments for this post
        </p>
      )}
      <p className="text-xl font-medium mb-4 mt-6">Add new comment</p>
      {userState.state === 'authenticated' ? (
        <form onSubmit={newCommentSubmitHandler} id="add-new-comment">
          <div className="mt-6 relative rounded-md shadow-sm">
            <TextArea
              className="h-36"
              placeholder="Write comment here, markdown styling is supported"
              ref={commentRef}
            />
          </div>
          <div className="sm:w-48 ml-auto mt-3">
            <Button>Post comment</Button>
          </div>
        </form>
      ) : (
        <p className="text-center mt-12 mb-6">
          <AnchorLink
            href={`/auth/login?next=${encodeURIComponent(
              getBaseURL() + `/blog/posts/${slug}#add-new-comment`
            )}`}
          >
            Log in
          </AnchorLink>{' '}
          to add comment.
        </p>
      )}
    </section>
  )
}

export default CommentSection
