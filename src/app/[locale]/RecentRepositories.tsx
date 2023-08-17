'use client'
import { config, dateFormatting } from '@/config/common'
import { useFormatter, useTranslations } from 'next-intl'
import { Section } from './Section'
import { PortofolioList } from './PortofolioList'
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import Link from '@/components/Link'
import useSWRImmutable from 'swr/immutable'
import { RepeatIcon } from '@chakra-ui/icons'

export type GithubRepo = {
  id: number
  name: string
  description: string | null
  updated_at: string
  html_url: string
  topics: string[]
}

// @ts-expect-error
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const RecentRepositories = () => {
  const t = useTranslations('HomePage')
  const {
    data: repositories,
    isLoading,
    error,
    mutate,
    isValidating,
  } = useSWRImmutable<GithubRepo[]>(
    `https://api.github.com/users/${config.githubUsername}/repos?sort=updated&per_page=5`,
    fetcher
  )

  return (
    <Section>
      <Section.Title>{t('recentRepositories')}</Section.Title>
      <PortofolioList aria-busy={isValidating}>
        {isLoading &&
          [1, 2, 3, 4, 5].map((number) => (
            <RecentRepositorySkeleton key={`repository-skeleton-${number}`} />
          ))}
        {error && (
          <Flex direction={'column'} rowGap={4}>
            <Text textAlign={'center'}>{t('failedToLoadRepositories')}</Text>
            <Button
              leftIcon={<RepeatIcon />}
              onClick={() => mutate()}
              mx={'auto'}
            >
              {t('tryAgain')}
            </Button>
          </Flex>
        )}
        {repositories?.map((repository) => (
          <RecentRepository key={repository.html_url} repository={repository} />
        ))}
        {repositories?.length === 0 && (
          <Flex direction={'column'} rowGap={4}>
            <Text textAlign={'center'}>{t('noRepositoriesFound')}</Text>
            <Button
              leftIcon={<RepeatIcon />}
              onClick={() => mutate()}
              mx={'auto'}
            >
              {t('tryAgain')}
            </Button>
          </Flex>
        )}
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

const RecentRepositorySkeleton = () => {
  return (
    <Box
      as={'li'}
      transition={'transform 0.2s ease-in-out'}
      _hover={{
        transform: 'scale(1.02)',
      }}
      aria-hidden
    >
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        rowGap={{ base: 2 }}
        columnGap={{ base: 0, md: 8 }}
        paddingY={4}
        justifyContent={{ base: 'flex-start', md: 'space-between' }}
      >
        <Flex direction={'column'} rowGap={2} width={'100%'}>
          <Skeleton height={'20px'} width={'60%'} />
          <Skeleton height={'16px'} />
          <Skeleton height={'16px'} width={'80%'} />
        </Flex>
        <Box minWidth={'20%'} maxWidth={'120px'}>
          <Skeleton height={'16px'} />
        </Box>
      </Flex>
      <Divider />
    </Box>
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
