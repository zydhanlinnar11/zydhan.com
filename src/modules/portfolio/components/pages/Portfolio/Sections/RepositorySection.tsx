import Link from '@/common/components/Link'
import { personalInfo } from '@/common/config/personal-info'
import useGithubRepo from '@/portfolio/hooks/useGithubRepo'
import { SectionListItem } from '@/portfolio/types/SectionListItem'
import { Badge, Flex, HStack, List } from '@chakra-ui/react'
import Section from './Section'
import SectionListLink from './SectionListLink'

const RepositorySection = () => {
  const { repositories } = useGithubRepo(personalInfo.github)

  const projects: SectionListItem[] = repositories
    ? repositories.map(
        ({ description, html_url, name, topics, updated_at }) => ({
          date: new Date(updated_at).toLocaleDateString(),
          description: description ?? '',
          url: html_url,
          title: (
            <SectionListLink.Title>
              <Flex as={'span'} wrap={'wrap'} columnGap={'2'}>
                <span>{name}</span>
                <HStack as={'span'} spacing={2} wrap={'wrap'} marginLeft={'0'}>
                  {topics.map((topic) => (
                    <Badge
                      key={`${html_url}-${topic}`}
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
              </Flex>
            </SectionListLink.Title>
          ),
        })
      )
    : []

  return (
    <Section title="Recent Repositories">
      <List w={'full'}>
        {projects.map((project) => (
          <SectionListLink key={project.url} item={project} />
        ))}
      </List>
      <Link
        href={`https://github.com/${personalInfo.github}`}
        target={'_blank'}
      >
        View all repositories →
      </Link>
    </Section>
  )
}

export default RepositorySection
