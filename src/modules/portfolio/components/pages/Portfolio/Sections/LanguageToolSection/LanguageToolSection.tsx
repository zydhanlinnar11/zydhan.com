import { LanguageTool as LanguageToolType } from '@/portfolio/types/LanguageTool'
import Section from '../Section'
import LanguageTool from './LanguageTool'
import laravel from './images/laravel.png'
import nextjs from './images/nextjs.png'
import nextjsBlack from './images/nextjs-black.png'
import typescript from './images/typescript.png'
import php from './images/php.png'
import docker from './images/docker.png'
import { Flex, useColorMode } from '@chakra-ui/react'
import { useMemo } from 'react'

const LanguageToolSection = () => {
  const { colorMode } = useColorMode()
  const languageTools: LanguageToolType[] = useMemo(
    () => [
      { image: laravel, name: 'Laravel' },
      { image: colorMode === 'dark' ? nextjs : nextjsBlack, name: 'Next.js' },
      { image: typescript, name: 'TypeScript' },
      { image: php, name: 'PHP' },
      { image: docker, name: 'Docker' },
    ],
    [colorMode]
  )

  return (
    <Section title="Favorite Language and Tools">
      <Flex wrap={'wrap'} gap={4} w={'full'} justifyContent={'center'}>
        {languageTools.map((item) => (
          <LanguageTool key={item.name} languageTool={item} />
        ))}
      </Flex>
    </Section>
  )
}

export default LanguageToolSection
