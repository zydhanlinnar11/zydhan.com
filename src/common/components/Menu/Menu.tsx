import { FC } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import Image from 'next/image'

type Props = {
  icon: IconProp | string
  iconSize: SizeProp
}

const Menu: FC<Props> = ({ children, icon, iconSize }) => {
  return (
    <HeadlessMenu as="div" className="ml-3 relative">
      <div>
        <HeadlessMenu.Button className="flex text-sm rounded-full">
          <span className="sr-only">Open user menu</span>
          <span className="text-gray-700 dark:text-gray-300">
            {typeof icon === 'string' ? (
              <Image
                className="h-8 w-8 rounded-full dark:bg-white hover:opacity-75 transition duration-150 ease-in-out"
                src={icon}
                width={28}
                height={28}
                alt="User profile picture"
              />
            ) : (
              <FontAwesomeIcon icon={icon} size={iconSize} />
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
