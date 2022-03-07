import { Menu } from '@headlessui/react'
import { FC, MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler
}

const MenuItem: FC<Props> = ({ children, onClick }) => {
  return (
    <Menu.Item
      as='li'
      className='py-2 px-3 text-left transition-all duration-150
              hover:cursor-pointer flex items-center
              rounded text-sm hover:bg-blue-600/30'
    >
      {children}
    </Menu.Item>
  )
}
export default MenuItem
