import Router from 'next/router'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import BlogConfig from '../../config/BlogConfig'
import Post from '../../interfaces/Post'
import FullWidthButton from '../Button/FullWidthButton'
import Input from './Input'

interface AddEditPostFormProps {
  post?: Post
}

export default function AddEditPostForm({ post }: AddEditPostFormProps) {
  const postTitleRef = useRef(null)
  const postDescriptionRef = useRef(null)
  const postMarkdownRef = useRef(null)
  const router = useRouter()
  const title: string = router.query.title as string
  const description: string = router.query.description as string
  const markdown: string = router.query.markdown as string

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
    Router.replace(`/admin/posts/${result.newSlug}`)
  }

  async function createPostHandler() {
    let body = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }

    const slug = await BlogConfig.POST_SERVICE.addSinglePost(body)
    if (!slug) return
    Router.replace(`/admin/posts/${slug}`)
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    if (post) editPostHandler()
    else createPostHandler()
  }

  function previewPost() {
    const query: {
      title: string
      description: string
      markdown: string
      slug?: string
      createdAt?: string
    } = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }
    if (post) {
      query.slug = post.slug
      query.createdAt = post.createdAt
    }

    if (
      !postTitleRef.current.value ||
      !postDescriptionRef.current.value ||
      !postMarkdownRef.current.value
    )
      return

    Router.push({
      pathname: '/admin/posts/preview',
      query,
    })
  }

  return (
    <form className='md:px-12 pb-12' onSubmit={submitHandler}>
      <Input
        label='Title'
        name='post-title'
        position='single'
        type={'text'}
        reference={postTitleRef}
        defaultValue={title ?? post?.title}
        showLabel={true}
      />
      <Input
        label='Description'
        name='post-description'
        position='single'
        type={'text'}
        reference={postDescriptionRef}
        defaultValue={description ?? post?.description}
        showLabel={true}
        className='mt-3'
      />
      <div className='mt-3'>
        <label htmlFor='post-markdown'>Markdown</label>
        <div className='mt-2 relative rounded-md shadow-sm'>
          <textarea
            name='post-markdown'
            id='post-markdown'
            className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-2 rounded-md h-96 bg-transparent border border-white/[0.24]'
            placeholder='Markdown'
            ref={postMarkdownRef}
            defaultValue={markdown ?? post?.markdown}
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
      <FullWidthButton type='button' onClick={previewPost}>
        Preview
      </FullWidthButton>
    </form>
  )
}
