import ReactMarkdown from 'react-markdown'
import Comment from '@blog-models/Comment'
import React, { FormEvent, Fragment, useRef, useState } from 'react'
import rehypeRaw from 'rehype-raw'
import DateTool from 'utilities/DateTool'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@blog-providers/AuthProvider'
import FullWidthButton from '@blog-components/Button/FullWidthButton'
import SmallErrorText from '@blog-components/SmallErrorText'

interface CommentCardProps {
  comment: Comment
  deleteHandler: (comment: Comment) => Promise<void>
  editHandler: (id: string, content: string) => Promise<void>
}

function CommentCard({
  comment,
  deleteHandler,
  editHandler,
}: CommentCardProps) {
  const { user } = useAuth()
  const [isShowEdit, setShowEdit] = useState(false)
  const [editErrorMessage, setEditErrorMessage] = useState('')
  const contentRef = useRef(null)

  const formEditHandler = async (e: FormEvent) => {
    setEditErrorMessage('')
    e.preventDefault()
    try {
      await editHandler(comment.id, contentRef?.current?.value)
      setShowEdit(false)
    } catch (e) {
      setEditErrorMessage(`Error: ${e}. Please try again later.`)
    }
  }

  return (
    <li
      className='w-full border border-white/20 rounded px-5 py-3'
      id={comment.id}
    >
      <div className='flex justify-between'>
        <div className='w-full flex gap-3 mb-3'>
          <div className='h-10 w-10 bg-white rounded-full shrink-0 my-auto'>
            <Image
              className='rounded-full shrink-0 my-auto'
              width={40}
              height={40}
              src={
                comment.userAvatarUrl ||
                `https://avatars.dicebear.com/api/human/${comment.userId}.svg`
              }
              alt={`Profile picture of ${comment.userName}`}
            ></Image>
          </div>
          <div className='my-auto'>
            <p className='text-sm'>{comment.userName}</p>
            <p className='text-xs text-gray-400'>
              {DateTool.format(comment.createdAt)}
            </p>
          </div>
        </div>
        <div>
          {(user?.admin || user?.id === comment.userId) && (
            <Menu as='div' className='relative inline-block text-left'>
              <Menu.Button className='w-8 h-8 -mr-2 hover:bg-blue-600/30 rounded transition-all duration-150'>
                <FontAwesomeIcon icon={faEllipsisV} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute origin-top-right bg-gray-900 flex flex-col right-0 w-56 mt-2 border border-white/20 rounded py-1 z-10'>
                  {user?.id === comment.userId && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setShowEdit(true)}
                          className={`${
                            active && 'bg-blue-600/30'
                          } py-2 pl-3 pr-9 text-left transition-all duration-150`}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='mr-2'
                          />{' '}
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  )}
                  {(user?.admin || user?.id === comment.userId) && (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => deleteHandler(comment)}
                          className={`${
                            active && 'bg-blue-600/30'
                          } py-2 pl-3 pr-9 text-left text-red-500 transition-all duration-150`}
                        >
                          <FontAwesomeIcon icon={faTrash} className='mr-2' />{' '}
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
      <div className='px-1'>
        {isShowEdit ? (
          <form onSubmit={formEditHandler}>
            <p className='text-lg font-medium px-1'>Edit comment</p>
            <div className='mt-3 relative rounded-md shadow-sm'>
              <textarea
                name='post-markdown'
                className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-3 rounded-md h-36 bg-transparent border border-white/[0.24]'
                placeholder='Write comment here, markdown styling is supported'
                defaultValue={comment.content}
                ref={contentRef}
              />
            </div>
            <SmallErrorText>{editErrorMessage}</SmallErrorText>
            <div className='sm:w-96 ml-auto flex gap-x-3 gap-y-1 flex-col sm:flex-row'>
              <FullWidthButton type='button' onClick={() => setShowEdit(false)}>
                Cancel
              </FullWidthButton>
              <FullWidthButton type='submit'>Edit</FullWidthButton>
            </div>
          </form>
        ) : (
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialOceanic}
                    language={match[1]}
                    customStyle={{
                      borderRadius: '0.375rem',
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className={
                      className + ' py-1 px-2 m-0 text-sm rounded bg-gray-700'
                    }
                    {...props}
                  >
                    {children}
                  </code>
                )
              },
              a: ({ node, children, ...props }) => (
                <a
                  className='text-blue-400 hover:underline visited:text-indigo-500'
                  {...props}
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className='list-disc list-inside pl-4 mb-4'>{children}</ul>
              ),
              ol: ({ children }) => (
                <ul className='list-decimal list-inside mb-4'>{children}</ul>
              ),
              img: ({ node, children, ...props }) => (
                <span className='w-full h-36 sm:h-56 flex items-center block'>
                  <img
                    src={props.src}
                    alt={props.alt}
                    className='mx-auto my-2 max-h-full max-w-full'
                  />
                </span>
              ),
              h1: ({ children }) => (
                <h1 className='border-b border-b-white/[0.24] mt-6 mb-4 text-2xl pb-2 font-medium'>
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className='border-b border-b-white/[0.24] mt-6 mb-4 text-xl pb-2 font-medium'>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-lg font-medium mt-6 mb-4'>{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className='text font-medium mt-6 mb-4'>{children}</h4>
              ),
              h5: ({ children }) => (
                <h5 className='text-sm font-medium mt-6 mb-4'>{children}</h5>
              ),
              h6: ({ children }) => (
                <h6 className='text-sm text-white/50 font-medium mt-6 mb-4'>
                  {children}
                </h6>
              ),
              p: ({ children }) => <p className='mb-4 mt-0'>{children}</p>,
            }}
          >
            {comment.content ?? 'Content not available'}
          </ReactMarkdown>
        )}
      </div>
    </li>
  )
}

export default CommentCard
