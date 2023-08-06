'use client'
import { useFormatter, useTranslations } from 'next-intl'
import { Section } from './Section'
import { GithubRepo } from './RecentRepositories'
import { PortofolioList } from './PortofolioList'
import { Badge, Box, Flex } from '@chakra-ui/react'
import Link from '@/components/Link'
import { config, dateFormatting } from '@/config/common'

export const RecentRepositoriesClient = ({
  repositories,
}: {
  repositories: GithubRepo[]
}) => {
  const t = useTranslations('HomePage')

  return (
    <Section>
      <Section.Title>{t('recentRepositories')}</Section.Title>
      <PortofolioList>
        {repositories.map((repository) => (
          <RecentRepository key={repository.html_url} repository={repository} />
        ))}
      </PortofolioList>
      <Box>
        <Link
          href={`https://github.com/${config.githubUsername}`}
          target="_blank"
        >
          {`${t('viewAllRepositories')} →`}
        </Link>
      </Box>
    </Section>
  )
}

const RecentRepository = ({ repository }: { repository: GithubRepo }) => {
  const titleId = `repository-title-${repository.id}`
  const descriptionId = `repository-description-${repository.id}`
  const format = useFormatter()
  const t = useTranslations('HomePage')

  return (
    <PortofolioList.Item
      descriptionId={descriptionId}
      titleId={titleId}
      url={repository.html_url}
      external
    >
      <PortofolioList.ItemContent>
        <PortofolioList.ItemTitle id={titleId}>
          <Flex as={'span'} gap={2} flexWrap={'wrap'}>
            <span>{repository.name}</span>{' '}
            <Flex
              aria-hidden
              as={'span'}
              alignItems={'center'}
              gap={2}
              flexWrap={'wrap'}
            >
              {repository.topics.map((topic) => (
                <Badge
                  key={topic}
                  colorScheme={'cyan'}
                  borderRadius={'full'}
                  px={3}
                  textTransform={'lowercase'}
                  fontWeight={'medium'}
                  fontSize={'sm'}
                  height={'fit-content'}
                >
                  {topic}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </PortofolioList.ItemTitle>

        <PortofolioList.ItemDescription id={descriptionId}>
          {repository.description ?? t('noDescriptionAvailable')}
        </PortofolioList.ItemDescription>
      </PortofolioList.ItemContent>
      <PortofolioList.ItemTime>
        <time dateTime={repository.updated_at}>
          {format.dateTime(new Date(repository.updated_at), dateFormatting)}
        </time>
      </PortofolioList.ItemTime>
    </PortofolioList.Item>
  )
}
