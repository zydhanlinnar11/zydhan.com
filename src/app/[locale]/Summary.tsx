'use client'

import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import logo from '../../../public/logo.webp'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const Summary = () => {
  const t = useTranslations('HomePage')

  return (
    <Flex
      direction={{ base: 'column', md: 'row-reverse' }}
      rowGap={4}
      justifyContent={{ base: 'start', md: 'space-between' }}
    >
      <Box position={'relative'} w={'128px'} h={'128px'} flexShrink={'0'}>
        <Image src={logo} alt={t('logo')} fill sizes="128px" />
      </Box>
      <Flex direction={'column'} rowGap={2} maxWidth={'lg'}>
        <Heading as={'h1'}>{t('title')}</Heading>
        <Text fontSize={'lg'}>{t('subtitle')}</Text>
        <Text>{t('description')}</Text>
      </Flex>
    </Flex>
  )
}

export default Summary
