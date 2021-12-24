import Router from 'next/router'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import BlogConfig from '../../config/BlogConfig'
import Post from '../../models/Post'
import FullWidthButton from '../Button/FullWidthButton'
import SmallErrorText from '../SmallErrorText'
import SmallSuccessText from '../SmallSuccessText'
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
  const [errorText, setErrorText] = useState<string>('')

  async function deletePostHandler() {
    setErrorText('')
    try {
      await BlogConfig.POST_SERVICE.deleteSinglePost(post.slug)
      Router.push('/admin/posts')
    } catch (e) {
      setErrorText(e.message)
    }
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
    setErrorText('')

    let body = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }

    try {
      const result = await BlogConfig.POST_SERVICE.editSinglePost(
        post.slug,
        body
      )
      Router.replace(`/admin/posts/${result}`)
    } catch (e) {
      setErrorText(e.message)
    }
  }

  async function createPostHandler() {
    setErrorText('')

    let body = {
      title: postTitleRef.current.value,
      description: postDescriptionRef.current.value,
      markdown: postMarkdownRef.current.value,
    }

    try {
      const slug = await BlogConfig.POST_SERVICE.addSinglePost(body)
      if (!slug) return
      Router.replace(`/admin/posts/${slug}`)
    } catch (e) {
      setErrorText(e.message)
    }
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()

    if (post) editPostHandler()
    else createPostHandler()
  }

  function previewPost() {
    setErrorText('')
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
    ) {
      setErrorText('Please fill all input.')
      return
    }

    Router.push({
      pathname: '/admin/posts/preview',
      query,
    })
  }

  return (
    <form
      className='md:px-12 pb-12 max-w-full w-screen'
      onSubmit={submitHandler}
    >
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
      <div className='text-center w-full'>
        <SmallErrorText>{errorText}</SmallErrorText>
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
