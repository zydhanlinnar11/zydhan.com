import { VStack } from '@chakra-ui/react'
import LanguageToolSection from './Sections/LanguageToolSection'
import ProfileSection from './Sections/ProfileSection'

const Portfolio = () => {
  return (
    <VStack as={'div'} spacing={4}>
      <ProfileSection />
      <LanguageToolSection />
    </VStack>
  )
}

export default Portfolio
