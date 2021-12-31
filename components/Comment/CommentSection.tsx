import AnchorLink from '@blog-components/AnchorLink'
import FullWidthButton from '@blog-components/Button/FullWidthButton'
import BlogConfig from '@blog-config/BlogConfig'
import Comment from '@blog-models/Comment'
import Post from '@blog-models/Post'
import { useAuth } from '@blog-providers/AuthProvider'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import CommentCard from './CommentCard'

interface CommentSectionProps {
  post: Post
}

export default function CommentSection({ post }: CommentSectionProps) {
  const { slug: postSlug, id: postId } = post
  const [comments, setComments] = useState<Comment[]>([])
  const newCommentRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchComments() {
      const fetched = await BlogConfig.COMMENT_SERVICE.getAllCommentsByPostSlug(
        postSlug
      )
      setComments(fetched)
    }
    fetchComments()
  }, [postSlug])

  const newCommentSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const content = newCommentRef.current.value
      const comment = await BlogConfig.COMMENT_SERVICE.addComment(
        postSlug,
        content
      )

      setComments((prevComments) => [comment, ...prevComments])
      document.getElementById(`comments-section`)?.scrollIntoView()
      newCommentRef.current.value = ''
    } catch (e) {}
  }

  const deleteCommentHandler = async (deletedComment: Comment) => {
    try {
      if (confirm('Are you sure want to delete this comment?')) {
        await BlogConfig.COMMENT_SERVICE.deleteComment(deletedComment.id)

        setComments((comments) =>
          comments.filter((comment) => comment.id !== deletedComment.id)
        )
      }
    } catch (e) {}
  }

  const editPostHandler = async (id: string, content: string) => {
    const newComment = await BlogConfig.COMMENT_SERVICE.editComment(id, content)

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === newComment.id) return newComment
        return comment
      })
    )
  }

  return (
    <section className='text-left px-2 pb-8' id='comments-section'>
      <h2 className='border-b border-b-white/[0.24] mb-4 text-2xl pb-2 font-medium'>
        Comments
      </h2>
      {comments?.length > 0 ? (
        <ul className='mb-3 flex flex-col gap-5'>
          {comments.map((comment) => (
            <CommentCard
              deleteHandler={deleteCommentHandler}
              editHandler={editPostHandler}
              key={comment.id}
              comment={comment}
            />
          ))}
        </ul>
      ) : (
        <p className='text-center my-12'>
          There are currently no comments for this post
        </p>
      )}
      <p className='text-xl font-medium mb-4 mt-6'>Add new comment</p>
      {user ? (
        <form onSubmit={newCommentSubmitHandler} id='add-new-comment'>
          <div className='mt-6 relative rounded-md shadow-sm'>
            <textarea
              name='post-markdown'
              id='post-markdown'
              className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-3 rounded-md h-36 bg-transparent border border-white/[0.24]'
              placeholder='Write comment here, markdown styling is supported'
              ref={newCommentRef}
            />
          </div>
          <div className='sm:w-48 ml-auto'>
            <FullWidthButton>Post comment</FullWidthButton>
          </div>
        </form>
      ) : (
        <p className='text-center mt-12 mb-6'>
          <AnchorLink href={`/login?from-post=${postSlug}`}>Log in</AnchorLink>{' '}
          to add comment.
        </p>
      )}
    </section>
  )
}
