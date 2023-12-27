'use client'
import {
  Box,
  Card,
  CardBody,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import NextJs from '@/assets/images/languages/nextjs.png'
import NextJsBlack from '@/assets/images/languages/nextjs-black.png'
import TypeScript from '@/assets/images/languages/typescript.png'
import Docker from '@/assets/images/languages/docker.png'
import Laravel from '@/assets/images/languages/laravel.png'
import GoBlue from '@/assets/images/languages/go-blue.webp'
import GoWhite from '@/assets/images/languages/go-white.webp'
import { useTranslations } from 'next-intl'
import Image, { StaticImageData } from 'next/image'
import { Section } from './Section'

type FavoriteLanguage = {
  name: string
  image:
    | {
        light: StaticImageData
        dark: StaticImageData
      }
    | StaticImageData
}

const favoriteLanguages: FavoriteLanguage[] = [
  {
    name: 'Next.js',
    image: {
      light: NextJsBlack,
      dark: NextJs,
    },
  },
  {
    name: 'Laravel',
    image: Laravel,
  },
  {
    name: 'Go',
    image: {
      dark: GoWhite,
      light: GoBlue,
    },
  },
  {
    name: 'TypeScript',
    image: TypeScript,
  },
  {
    name: 'Docker',
    image: Docker,
  },
]

export const LanguageAndTools = () => {
  const t = useTranslations('HomePage')

  return (
    <Section>
      <Section.Title>{t('favoriteLanguages')}</Section.Title>
      <Flex
        direction={'row'}
        wrap={'wrap'}
        columnGap={4}
        rowGap={4}
        justifyContent={'center'}
        as={'ul'}
        listStyleType={'none'}
      >
        {favoriteLanguages.map((language) => (
          <LanguageCard key={language.name} language={language} />
        ))}
      </Flex>
    </Section>
  )
}

const LanguageCard = ({ language }: { language: FavoriteLanguage }) => {
  return (
    <Card
      as={'li'}
      minWidth={'160px'}
      transition={'transform 0.2s ease-in-out'}
      _hover={{
        transform: 'scale(1.05)',
      }}
    >
      <CardBody
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        rowGap={2}
      >
        <Box width={'48px'} height={'48px'} position={'relative'}>
          <Image
            src={useColorModeValue(
              'light' in language.image ? language.image.light : language.image,
              'dark' in language.image ? language.image.dark : language.image
            )}
            alt={language.name}
            fill
            sizes="48px"
            aria-hidden
          />
        </Box>
        <Text>{language.name}</Text>
      </CardBody>
    </Card>
  )
}
