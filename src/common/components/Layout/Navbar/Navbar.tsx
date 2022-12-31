import { Box, Button, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import logo from 'public/logo.webp'

const Navbar = () => {
  return (
    <Box
      as={'header'}
      w="100%"
      h={'52px'}
      display={'flex'}
      justifyContent={'center'}
    >
      <HStack
        as="ul"
        maxW={'container.lg'}
        w={'full'}
        listStyleType={'none'}
        display="flex"
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
      </HStack>
    </Box>
  )
}

export default Navbar
