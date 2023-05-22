'use client'
import styles from '@/styles/pages/Home.module.scss'
import typography from '@/styles/typography.module.scss'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useId } from 'react'

const companies = [
  {
    key: 'dptsi_its',
    website: 'https://www.its.ac.id/dptsi',
    startDate: '2021-08',
  },
]

export const ExperiencesSection = () => {
  const t = useTranslations('Home')

  return (
    <section className={styles.section}>
      <h2 className={typography['headline-small']}>
        {t('experiences_section.title')}
      </h2>
      <div>
        {companies.map(({ key, website, startDate }) => (
          <Item
            key={key}
            website={website}
            company={key}
            startDate={startDate}
          />
        ))}
      </div>
    </section>
  )
}

const Item = ({
  website,
  company,
  startDate,
}: {
  website: string
  company: string
  startDate: string
}) => {
  const t = useTranslations('Home')
  const id = useId()

  return (
    <Link href={website} target="_blank" aria-labelledby={id}>
      <article
        key={company}
        className={clsx(styles.experiences__item, styles.listSection__item)}
      >
        <h3
          className={clsx(
            typography['body-large'],
            styles.experiences__title,
            styles.listSection__title
          )}
        >
          {t(`experiences_section.${company}.role` as any)} @
          <span id={id}>
            {t(`experiences_section.${company}.company` as any)}
          </span>
        </h3>
        <p className={styles.experiences__description}>
          {t(`experiences_section.${company}.description` as any)}
        </p>
        <p className={styles.experiences__date}>
          <time dateTime={startDate}>
            {t(`experiences_section.${company}.start_date` as any)}
          </time>
          <span aria-label={t('experiences_section.until')}> - </span>
          <time>{t(`experiences_section.${company}.end_date` as any)}</time>
        </p>
      </article>
    </Link>
  )
}
