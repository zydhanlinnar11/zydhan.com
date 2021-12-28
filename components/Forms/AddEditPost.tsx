import Router from 'next/router'
import { useRouter } from 'next/router'
import { Fragment, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Input from '@blog-components/Forms/Input'
import Post from '@blog-models/Post'
import BlogConfig from '@blog-config/BlogConfig'
import SmallErrorText from '@blog-components/SmallErrorText'
import FullWidthButton from '@blog-components/Button/FullWidthButton'

interface AddEditPostFormProps {
  post?: Post
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const visibilities = [
  { id: 1, name: 'Visible' },
  { id: 2, name: 'Unlisted' },
  { id: 3, name: 'Private' },
]

export default function AddEditPostForm({ post }: AddEditPostFormProps) {
  const postTitleRef = useRef(null)
  const postDescriptionRef = useRef(null)
  const postMarkdownRef = useRef(null)
  const router = useRouter()
  const title: string = router.query.title as string
  const description: string = router.query.description as string
  const markdown: string = router.query.markdown as string
  const [errorText, setErrorText] = useState<string>('')
  const [selectedVisibility, setSelectedVisibility] = useState(
    post ? visibilities[JSON.parse(post.visibility) - 1] : visibilities[0]
  )

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
      visibility: selectedVisibility.id,
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
      visibility: selectedVisibility.id,
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
        <Listbox value={selectedVisibility} onChange={setSelectedVisibility}>
          {({ open }) => (
            <>
              <Listbox.Label className='block'>Visibility</Listbox.Label>
              <div className='mt-1 relative'>
                <Listbox.Button className='relative w-full border border-white/[0.24] rounded-md shadow-sm px-4 py-2 text-left cursor-default focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none'>
                  <span className='flex items-center'>
                    <span className='block truncate'>
                      {selectedVisibility.name}
                    </span>
                  </span>
                  <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <SelectorIcon
                      className='h-5 w-5 text-white'
                      aria-hidden='true'
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-white/[0.24] ring-opacity-5 overflow-auto focus:outline-none'>
                    {visibilities.map((visibility) => (
                      <Listbox.Option
                        key={visibility.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-blue-600/30' : 'text-white',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={visibility}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className='flex items-center'>
                              <span className='ml-3 block truncate'>
                                {visibility.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
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
