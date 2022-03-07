import { FC } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'

type Props = {
  icon: IconProp
  iconSize: SizeProp
}

const Menu: FC<Props> = ({ children, icon, iconSize }) => {
  return (
    <HeadlessMenu as='div' className='ml-3 relative'>
      <div>
        <HeadlessMenu.Button className='bg-gray-800 flex text-sm rounded-full'>
          <span className='sr-only'>Open user menu</span>
          <span className='text-gray-300'>
            <FontAwesomeIcon icon={icon} size={iconSize} />
          </span>
        </HeadlessMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <HeadlessMenu.Items
          as='ol'
          className='absolute origin-top-right bg-gray-900 flex
              flex-col right-0 w-56 mt-2 border border-white/20 rounded py-1 z-10 break-all'
        >
          {children}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  )
}

export default Menu
