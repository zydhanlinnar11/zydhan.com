import { useUser } from '@/common/providers/UserProvider'
import { FaUserAlt } from 'react-icons/fa'
import {
  Box,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem as ChakraMenuItem,
  MenuList,
  forwardRef,
  ButtonProps,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

type MenuItemProps = {
  href: string
}

const MenuItem: FC<PropsWithChildren<MenuItemProps>> = ({ children, href }) => (
  <Link href={href}>
    <ChakraMenuItem rounded={'md'}>{children}</ChakraMenuItem>
  </Link>
)

const Menu = () => {
  const { user } = useUser()

  return (
    <ChakraMenu>
      <Box as="li">
        <MenuButton as={OptionButton}>
          <FaUserAlt />
        </MenuButton>
      </Box>
      <MenuList p={'2'}>
        {!user && <MenuItem href="/auth/login">Login</MenuItem>}
        {user && (
          <>
            <MenuItem href="/auth/account/settings">Account settings</MenuItem>
            <MenuItem href="/auth/logout">Logout</MenuItem>
          </>
        )}
      </MenuList>
    </ChakraMenu>
  )
}

const OptionButton = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button colorScheme="gray" size={'sm'} ref={ref} {...props} />
))

export default Menu
