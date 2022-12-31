import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Container, HStack, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/logo.webp'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container
      maxW={'container.lg'}
      as={'header'}
      w="100%"
      h={'52px'}
      display={'flex'}
      justifyContent={'space-between'}
      px={4}
    >
      <HStack
        as="ul"
        listStyleType={'none'}
        alignItems={'center'}
        spacing={'16px'}
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
        <Box as="li">
          <Link href={'/'}>
            <Button colorScheme="gray" variant="ghost" size={'sm'}>
              Home
            </Button>
          </Link>
        </Box>
        <Box as="li">
          <Link href={'/blog'}>
            <Button colorScheme="gray" variant="ghost" size={'sm'}>
              Blog
            </Button>
          </Link>
        </Box>
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
            {colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </HStack>
    </Container>
  )
}

export default Navbar
