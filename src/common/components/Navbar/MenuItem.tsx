import { Menu } from '@headlessui/react'
import { FC, MouseEventHandler } from 'react'

type Props = {
  onClick?: MouseEventHandler
}

const MenuItem: FC<Props> = ({ children, onClick }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <p
          onClick={onClick}
          className={`${
            active && 'bg-blue-600/30'
          } py-2 px-3 text-left transition-all duration-150
            hover:cursor-pointer flex items-center
            mx-4 my-1 rounded text-sm`}
        >
          {children}
        </p>
      )}
    </Menu.Item>
  )
}
export default MenuItem
