import Link from '@/common/components/Link'
import { personalInfo } from '@/common/config/personal-info'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import logo from 'public/logo.webp'

const ProfileSection = () => {
  return (
    <Box
      as="section"
      display={'flex'}
      flexDir={{ base: 'column', md: 'row-reverse' }}
      gap={4}
      w={'full'}
      justifyContent={'space-between'}
    >
      <Box w={'full'} h={'full'} maxW={'128px'} maxH={'128px'}>
        <Image
          src={logo}
          alt={'Animated photo of Zydhan'}
          width={128}
          height={128}
        />
      </Box>
      <VStack spacing={4} alignItems="start" maxW={'lg'}>
        <Heading as={'h1'}>{personalInfo.name}</Heading>
        <Text fontSize={'lg'}>{personalInfo.slogan}</Text>
        <Text>
          Hello friends! You can call me{' '}
          <Link href="#" fontWeight={'bold'}>
            Zydhan
          </Link>
          . I&apos;m web development enthusiast with 2 year of experiences and
          currently study to become Bachelor of Informatics Engineering at
          Sepuluh Nopember Institute of Technology Surabaya.
        </Text>
      </VStack>
    </Box>
  )
}

export default ProfileSection
