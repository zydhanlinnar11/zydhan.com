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
          } py-2 pl-3 pr-9 text-left transition-all duration-150 text-base hover:cursor-pointer`}
        >
          {children}
        </p>
      )}
    </Menu.Item>
  )
}
export default MenuItem
