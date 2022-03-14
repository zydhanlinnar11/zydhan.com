import { Menu } from '@headlessui/react'
import { FC, MouseEventHandler } from 'react'

type Props = {
  onClick: MouseEventHandler<HTMLLIElement> &
    ((event: { preventDefault: Function }) => void)
}

const MenuItem: FC<Props> = ({ children, onClick }) => {
  return (
    <Menu.Item
      as="li"
      className="py-2 px-3 text-left transition-all duration-150
              hover:cursor-pointer flex items-center
              rounded text-sm hover:bg-gray-600/30 text-gray-700 dark:text-gray-300 hover:text-white"
      onClick={onClick}
    >
      {children}
    </Menu.Item>
  )
}
export default MenuItem
