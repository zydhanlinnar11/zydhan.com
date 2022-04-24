import { FC, PropsWithChildren } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'

type Props = {
  icon?: string
}

const Menu: FC<PropsWithChildren<Props>> = ({ children, icon }) => {
  return (
    <HeadlessMenu as="div" className="ml-3 relative">
      <div>
        <HeadlessMenu.Button className="flex text-sm rounded-full">
          <span className="sr-only">Open user menu</span>
          <span className="text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors">
            {typeof icon === 'string' ? (
              <Image
                className="h-8 w-8 rounded-full dark:bg-white hover:opacity-75 transition duration-150 ease-in-out"
                src={icon}
                width={28}
                height={28}
                alt="User profile picture"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            )}
          </span>
        </HeadlessMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items
          as="ol"
          className="absolute origin-top-right bg-white dark:bg-black flex flex-col right-0 w-56 mt-5 shadow-md dark:shadow-none border border-black/20 dark:border-white/20 rounded z-10 break-all p-3 gap-y-1"
        >
          {children}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  )
}

export default Menu
