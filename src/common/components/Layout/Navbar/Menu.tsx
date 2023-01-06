import { useUser } from '@/common/providers/UserProvider'
import { FaUserAlt } from 'react-icons/fa'
import {
  Box,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  forwardRef,
  ButtonProps,
  Button,
} from '@chakra-ui/react'
import Link from 'next/link'

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
        {!user && (
          <Link href={'/auth/login'}>
            <MenuItem rounded={'md'}>Login</MenuItem>
          </Link>
        )}
        {user && (
          <Link href={'/auth/logout'}>
            <MenuItem rounded={'md'}>Logout</MenuItem>
          </Link>
        )}
      </MenuList>
    </ChakraMenu>
  )
}

const OptionButton = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button colorScheme="gray" size={'sm'} ref={ref} {...props} />
))

export default Menu
