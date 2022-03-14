import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

const CommentCardMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        aria-label="More option for comment"
        className="w-8 h-8 -mr-2 hover:bg-blue-600/30 rounded transition-all duration-150"
      >
        <FontAwesomeIcon className="my-0" icon={faEllipsisV} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute origin-top-right bg-gray-900 flex flex-col right-0 w-56 mt-2 border border-white/20 rounded py-1 z-10">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {}}
                className={`${
                  active && 'bg-blue-600/30'
                } py-2 pl-3 pr-9 text-left transition-all duration-150`}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2 my-0" />{' '}
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {}}
                className={`${
                  active && 'bg-blue-600/30'
                } py-2 pl-3 pr-9 text-left text-red-500 transition-all duration-150`}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2 my-0" /> Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default CommentCardMenu
