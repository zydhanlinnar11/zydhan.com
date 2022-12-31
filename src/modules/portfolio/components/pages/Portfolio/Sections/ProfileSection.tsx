import { personalInfo } from '@/common/config/personal-info'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import logo from 'public/logo.webp'

const ProfileSection = () => {
  return (
    <Box
      as="section"
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={4}
    >
      <Image
        src={logo}
        alt={'Animated photo of Zydhan'}
        width={128}
        height={128}
      />
      <VStack spacing={4} alignItems="start">
        <Heading as={'h1'} size={'2xl'}>
          {personalInfo.name}
        </Heading>
        <Text fontSize={'lg'}>{personalInfo.slogan}</Text>
        <Text>{personalInfo.description}</Text>
      </VStack>
    </Box>
  )
}

export default ProfileSection
