import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import { ReactNode } from 'react'
import Menu from './Menu'
import logo from 'public/logo.webp'
import NextLink from 'next/link'

const Links = [
  { name: 'Home', href: '/' },
  { name: 'Guestbook', href: '/guestbook' },
  { name: 'Blog', href: '/blog/posts' },
]

const NavLink = ({
  children,
  href,
}: {
  children: ReactNode
  href?: string
}) => (
  <>
    <VStack as="li" paddingX={'12'} display={{ base: 'flex', md: 'none' }}>
      <Link
        as={NextLink}
        href={href}
        w={'full'}
        color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
        _hover={{
          color: useColorModeValue('black', 'white'),
          textDecoration: 'none',
        }}
        paddingY="1"
      >
        {children}
      </Link>
      <Divider style={{ marginTop: '0.1rem' }} />
    </VStack>
    <Box as="li" display={{ base: 'none', md: 'flex' }}>
      <Link
        as={NextLink}
        href={href}
        _hover={{
          color: useColorModeValue('black', 'white'),
          textDecoration: 'none',
        }}
      >
        <Button colorScheme="gray" variant="ghost" size={'sm'}>
          {children}
        </Button>
      </Link>
    </Box>
  </>
)

const Navbar = () => {
  const { toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex justifyContent={'center'} as={'header'} h={'52px'} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          px="4"
          w={'full'}
          maxWidth="container.lg"
        >
          <IconButton
            size={'sm'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems={'center'}
            as="ul"
            listStyleType={'none'}
          >
            <Box as="li">
              <Link href={'/'}>
                <Image
                  alt="Animated picture of Zydhan"
                  src={logo}
                  width={24}
                  height={24}
                />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              style={{ marginLeft: 0 }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} key={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack
            as="ul"
            listStyleType={'none'}
            alignItems={'center'}
            spacing={'16px'}
          >
            <Box as="li">
              <Button
                colorScheme="gray"
                size={'sm'}
                onClick={() => toggleColorMode()}
              >
                {useColorModeValue(<MoonIcon />, <SunIcon />)}
              </Button>
            </Box>
            <Menu />
          </HStack>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} pt={'2'} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={2}>
            {Links.map((link) => (
              <NavLink href={link.href} key={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </>
  )
}

export default Navbar
