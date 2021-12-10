import Router from 'next/router'
import React, { useRef } from 'react'
import BlogConfig from '../../config/BlogConfig'
import Post from '../../models/Post'
import FullWidthButton from '../Button/FullWidthButton'

interface AddEditPostFormProps {
  post?: Post
}

export default function AddEditPostForm({ post }: AddEditPostFormProps) {
  const postTitleRef = useRef(null)
  const postDescriptionRef = useRef(null)
  const postMarkdownRef = useRef(null)

  async function deletePostHandler() {
    const success = await BlogConfig.POST_SERVICE.deleteSinglePost(post.slug)

    if (!success) return
    Router.push('/admin/posts')
  }

  function showDeleteAlert() {
    if (
      !confirm(
        'Are you sure want to delete this post? This action is irreversible.'
      )
    )
      return
    deletePostHandler()
  }

  async function editPostHandler() {
    let body = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }

    const result = await BlogConfig.POST_SERVICE.editSinglePost(post.slug, body)
    if (!result.success) {
      return
    }
    Router.push(`/admin/posts/${result.newSlug}`)
  }

  async function createPostHandler() {
    let body = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }

    const slug = await BlogConfig.POST_SERVICE.addSinglePost(body)
    if (!slug) return
    Router.push(`/admin/posts/${slug}`)
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    if (post) editPostHandler()
    else createPostHandler()
  }

  return (
    <form className='md:px-12 pb-12' onSubmit={submitHandler}>
      <div>
        <label htmlFor='post-title'>Title</label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <input
            type='text'
            name='post-title'
            id='post-title'
            className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-md h-10 bg-transparent'
            style={{
              border: '1px solid rgba(255, 255, 255, 0.24)',
            }}
            placeholder='Title'
            defaultValue={post?.title}
            ref={postTitleRef}
          />
        </div>
      </div>
      <div className='mt-3'>
        <label htmlFor='post-description'>Description</label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <input
            type='text'
            name='post-description'
            id='post-description'
            className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-md h-10 bg-transparent'
            style={{
              border: '1px solid rgba(255, 255, 255, 0.24)',
            }}
            placeholder='Description'
            defaultValue={post?.description}
            ref={postDescriptionRef}
          />
        </div>
      </div>
      <div className='mt-3'>
        <label htmlFor='post-markdown'>Markdown</label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <textarea
            name='post-markdown'
            id='post-markdown'
            className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-2 rounded-md h-96 bg-transparent'
            style={{
              border: '1px solid rgba(255, 255, 255, 0.24)',
            }}
            placeholder='Markdown'
            ref={postMarkdownRef}
            defaultValue={post?.markdown}
          />
        </div>
      </div>
      <FullWidthButton type='submit'>
        {post ? 'Edit post' : 'Create post'}
      </FullWidthButton>
      {post && (
        <FullWidthButton type='button' onClick={showDeleteAlert}>
          Delete post
        </FullWidthButton>
      )}
    </form>
  )
}
