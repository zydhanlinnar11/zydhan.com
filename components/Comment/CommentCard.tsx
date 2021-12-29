import Comment from '@blog-models/Comment'
import React, { FormEvent, Fragment, useRef, useState } from 'react'
import DateTool from 'utilities/DateTool'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@blog-providers/AuthProvider'
import FullWidthButton from '@blog-components/Button/FullWidthButton'
import SmallErrorText from '@blog-components/SmallErrorText'
import CommentMarkdown from './CommentMarkdown'

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
              <Menu.Button
                aria-label='More option for comment'
                className='w-8 h-8 -mr-2 hover:bg-blue-600/30 rounded transition-all duration-150'
              >
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
          <CommentMarkdown markdown={comment.content} />
        )}
      </div>
    </li>
  )
}

export default CommentCard
