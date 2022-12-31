import { SectionListItem } from '@/portfolio/types/SectionListItem'
import { List } from '@chakra-ui/react'
import Section from './Section'
import SectionListLink from './SectionListLink'

const experiences: SectionListItem[] = [
  {
    date: 'Aug 2021 - now',
    description:
      'I was offered and accepted an internship offer with DPTSI - Directorate that manages Information Technology services in Sepuluh Nopember Institute of Technology Surabaya.',
    title: (
      <SectionListLink.Title>
        Full-stack Developer Intern @DPTSI ITS
      </SectionListLink.Title>
    ),
    url: 'https://www.its.ac.id/dptsi',
  },
]

const ExperienceSection = () => {
  return (
    <Section title="Work Experience">
      <List>
        {experiences.map((experience) => (
          <SectionListLink key={experience.url} item={experience} />
        ))}
      </List>
    </Section>
  )
}

export default ExperienceSection
