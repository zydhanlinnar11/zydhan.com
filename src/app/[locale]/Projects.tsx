'use client'
import { useFormatter, useTranslations } from 'next-intl'
import { Section } from './Section'
import { PortofolioList } from './PortofolioList'
import { dateFormatting } from '@/config/common'
import { ProjectMetadata } from '@/types/ProjectMetadata'
import { Box } from '@chakra-ui/react'
import Link from '@/components/Link'

export const Projects = ({ projects }: { projects: ProjectMetadata[] }) => {
  const t = useTranslations('HomePage')

  return (
    <Section>
      <Section.Title>{t('projects')}</Section.Title>
      <PortofolioList>
        {projects.map((project) => (
          <ProjectItem key={project.slug} project={project} />
        ))}
      </PortofolioList>
      <Box>
        <Link href={'/projects'}>{`${t('viewAllProjects')} →`}</Link>
      </Box>
    </Section>
  )
}

const ProjectItem = ({ project }: { project: ProjectMetadata }) => {
  const t = useTranslations('HomePage')
  const format = useFormatter()
  const titleId = `project-title-${project.slug}`
  const descriptionId = `project-description-${project.slug}`

  return (
    <PortofolioList.Item
      descriptionId={descriptionId}
      titleId={titleId}
      url={`/projects/${project.slug}`}
      external={false}
    >
      <PortofolioList.ItemContent>
        <PortofolioList.ItemTitle id={titleId}>
          {project.title}
        </PortofolioList.ItemTitle>

        <PortofolioList.ItemDescription id={descriptionId}>
          {project.subtitle}
        </PortofolioList.ItemDescription>
      </PortofolioList.ItemContent>
      <PortofolioList.ItemTime>
        <time dateTime={project.startDate}>
          {format.dateTime(new Date(project.startDate), dateFormatting)}
        </time>{' '}
        -{' '}
        <time dateTime={project.endDate}>
          {format.dateTime(new Date(project.endDate), dateFormatting)}
        </time>
      </PortofolioList.ItemTime>
    </PortofolioList.Item>
  )
}
