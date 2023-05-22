'use client'
import styles from '@/styles/pages/Home.module.scss'
import Image from 'next/image'
import siteLogo from '@/assets/images/site-logo.webp'
import typography from '@/styles/typography.module.scss'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

export const Header = () => {
  const t = useTranslations('Home')

  return (
    <header className={styles.header}>
      <div className={styles.header__logo} aria-hidden>
        <Image
          src={siteLogo}
          alt={t('header.logo_alt')}
          sizes="(min-width: 840px) 128px, 64px"
          fill
        />
      </div>
      <h1
        className={clsx(
          typography['headline-medium'],
          typography['screen-medium-headline-large']
        )}
      >
        {t('header.title')}
      </h1>
      <p className={typography['screen-medium-body-large']}>
        {t('header.subtitle')}
      </p>
      <p
        className={clsx(
          typography['body-small'],
          typography['screen-medium-body-medium']
        )}
      >
        {t('header.description')}
      </p>
    </header>
  )
}
