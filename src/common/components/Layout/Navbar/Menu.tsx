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
import { PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'

type MenuItemProps = {
  href: string
}

const MenuItem = ({ children, href }: PropsWithChildren<MenuItemProps>) => (
  <Link href={href}>
    <ChakraMenuItem rounded={'md'}>{children}</ChakraMenuItem>
  </Link>
)

const Menu = () => {
  const { status } = useSession()

  return (
    <ChakraMenu>
      <Box as="li">
        <MenuButton as={OptionButton}>
          <FaUserAlt />
        </MenuButton>
      </Box>
      <MenuList p={'2'}>
        {status === 'authenticated' ? (
          <>
            <MenuItem href="/auth/account/settings">Account settings</MenuItem>
            <MenuItem href="/auth/logout">Logout</MenuItem>
          </>
        ) : (
          <MenuItem href="/auth/login">Login</MenuItem>
        )}
      </MenuList>
    </ChakraMenu>
  )
}

const OptionButton = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button colorScheme="gray" size={'sm'} ref={ref} {...props} />
))

export default Menu
