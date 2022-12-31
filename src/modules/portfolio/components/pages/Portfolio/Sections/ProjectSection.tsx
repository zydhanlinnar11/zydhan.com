import { personalInfo } from '@/common/config/personal-info'
import useGithubRepo from '@/portfolio/hooks/useGithubRepo'
import { SectionListItem } from '@/portfolio/types/SectionListItem'
import { Badge, Box, HStack, List } from '@chakra-ui/react'
import Section from './Section'
import SectionListLink from './SectionListLink'

const ProjectSection = () => {
  const { repositories } = useGithubRepo(personalInfo.github)

  const projects: SectionListItem[] = repositories
    ? repositories.map(
        ({ description, html_url, name, topics, updated_at }) => ({
          date: new Date(updated_at).toLocaleDateString(),
          description: description ?? '',
          url: html_url,
          title: (
            <SectionListLink.Title>
              <HStack wrap={'wrap'}>
                <span>{name}</span>
                <HStack as={'span'} spacing={2} wrap={'wrap'}>
                  {topics.map((topic) => (
                    <Badge
                      as={'small'}
                      colorScheme={'cyan'}
                      px={3}
                      fontSize={'sm'}
                      fontWeight={'medium'}
                      rounded={'full'}
                      textTransform={'initial'}
                    >
                      {topic}
                    </Badge>
                  ))}
                </HStack>
              </HStack>
            </SectionListLink.Title>
          ),
        })
      )
    : []

  return (
    <Section title="Recent Projects">
      <List w={'full'}>
        {projects.map((project) => (
          <SectionListLink key={project.url} item={project} />
        ))}
      </List>
    </Section>
  )
}

export default ProjectSection
