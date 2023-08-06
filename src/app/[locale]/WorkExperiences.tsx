'use client'
import { useFormatter, useTranslations } from 'next-intl'
import { Section } from './Section'
import { PortofolioList } from './PortofolioList'
import { dateFormatting } from '@/config/common'

const experiences = [
  {
    key: 'dptsi_fullstack',
    url: 'https://www.its.ac.id/dptsi/',
    startDate: '2021-08-01',
    endDate: '2023-06-30',
  },
]

export const WorkExperiences = () => {
  const t = useTranslations('HomePage')

  return (
    <Section>
      <Section.Title>{t('workExperiences')}</Section.Title>
      <PortofolioList>
        {experiences.map((experience) => (
          <ExperienceItem key={experience.key} experience={experience} />
        ))}
      </PortofolioList>
    </Section>
  )
}

const ExperienceItem = ({
  experience,
}: {
  experience: (typeof experiences)[0]
}) => {
  const t = useTranslations('HomePage')
  const format = useFormatter()
  const titleId = `experience-title-${experience.key}`
  const descriptionId = `experience-description-${experience.key}`

  return (
    <PortofolioList.Item
      descriptionId={descriptionId}
      titleId={titleId}
      url={experience.url}
      external
    >
      <PortofolioList.ItemContent>
        <PortofolioList.ItemTitle id={titleId}>
          {`${t(`experiences.${experience.key}.title` as any)} @${t(
            `experiences.${experience.key}.company` as any
          )} - ${t(`experiences.${experience.key}.location` as any)}`}
        </PortofolioList.ItemTitle>

        <PortofolioList.ItemDescription id={descriptionId}>
          {t(`experiences.${experience.key}.description` as any)}
        </PortofolioList.ItemDescription>
      </PortofolioList.ItemContent>
      <PortofolioList.ItemTime>
        <time dateTime={experience.startDate}>
          {format.dateTime(new Date(experience.startDate), dateFormatting)}
        </time>{' '}
        -{' '}
        <time dateTime={experience.endDate}>
          {format.dateTime(new Date(experience.endDate), dateFormatting)}
        </time>
      </PortofolioList.ItemTime>
    </PortofolioList.Item>
  )
}
