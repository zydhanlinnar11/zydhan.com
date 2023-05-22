'use client'
import styles from '@/styles/pages/Home.module.scss'
import typography from '@/styles/typography.module.scss'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useId } from 'react'
import useSWR from 'swr'

const githubUsername = 'zydhanlinnar11'

type Repository = {
  id: number
  name: string
  description?: string
  topics: string[]
  html_url: string
}

export const RecentRepositoriesSection = () => {
  const t = useTranslations('Home')
  const { data, error, isLoading } = useSWR<Repository[]>(
    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`,
    async (key) => {
      const response = await fetch(key)
      if (!response.ok) throw await response.json()
      const data = await response.json()
      return data
    }
  )

  return (
    <section className={styles.section}>
      <h2 className={typography['headline-small']}>
        {t('repositories_section.title')}
      </h2>
      <div>
        {isLoading && (
          <div className={styles.errorLoadingContainer}>
            <Spinner />
          </div>
        )}
        {error && <p>{error.message}</p>}
        {data && data.map((repo) => <Item key={repo.id} repository={repo} />)}
      </div>
    </section>
  )
}

const Spinner = () => {
  return (
    <svg
      className={styles.spinner}
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={styles.spinner__path}
        fill="none"
        strokeWidth="4"
        cx="24"
        cy="24"
        r="20"
      ></circle>
    </svg>
  )
}

const Item = ({
  repository: { description, name, html_url, topics },
}: {
  repository: Repository
}) => {
  const t = useTranslations('Home')
  const labelId = useId()

  return (
    <Link href={html_url} target="_blank" aria-labelledby={labelId}>
      <article className={styles.listSection__item}>
        <h3
          className={clsx(
            typography['body-large'],
            styles.experiences__title,
            styles.listSection__title
          )}
          id={labelId}
        >
          {name}
        </h3>
        <p>{description ?? t('repositories_section.no_desc_available')}</p>
        <ul className={styles.repo__topics}>
          {topics.map((topic) => (
            <li
              key={topic}
              className={clsx(styles.repo__topic, typography['label-large'])}
            >
              {topic}
            </li>
          ))}
        </ul>
      </article>
    </Link>
  )
}
