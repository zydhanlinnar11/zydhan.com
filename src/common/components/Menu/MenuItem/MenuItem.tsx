import { Menu } from '@headlessui/react'
import { FC, MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
  onClick: MouseEventHandler<HTMLLIElement> &
    ((event: { preventDefault: Function }) => void)
}

const MenuItem: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <Menu.Item
      as="li"
      className="py-2 px-3 text-left transition-all duration-150
              hover:cursor-pointer flex items-center
              rounded text-sm text-gray-700 hover:bg-gray-400/30 hover:text-black dark:hover:bg-gray-600/30 dark:text-gray-300 dark:hover:text-white"
      onClick={onClick}
    >
      {children}
    </Menu.Item>
  )
}
export default MenuItem
