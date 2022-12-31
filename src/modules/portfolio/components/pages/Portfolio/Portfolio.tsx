import { VStack } from '@chakra-ui/react'
import ExperienceSection from './Sections/ExperienceSection'
import LanguageToolSection from './Sections/LanguageToolSection'
import ProfileSection from './Sections/ProfileSection'

const Portfolio = () => {
  return (
    <VStack as={'div'} spacing={8}>
      <ProfileSection />
      <LanguageToolSection />
      <ExperienceSection />
    </VStack>
  )
}

export default Portfolio
