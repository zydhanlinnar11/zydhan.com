import { LanguageTool as LanguageToolType } from '@/portfolio/types/LanguageTool'
import Section from '../Section'
import LanguageTool from './LanguageTool'
import laravel from './images/laravel.png'
import nextjs from './images/nextjs.png'
import typescript from './images/typescript.png'
import php from './images/php.png'
import docker from './images/docker.png'
import { Flex } from '@chakra-ui/react'

const languageTools: LanguageToolType[] = [
  { image: laravel, name: 'Laravel' },
  { image: nextjs, name: 'Next.js' },
  { image: typescript, name: 'TypeScript' },
  { image: php, name: 'PHP' },
  { image: docker, name: 'Docker' },
]

const LanguageToolSection = () => {
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
