'use client'
import styles from '@/styles/pages/Home.module.scss'
import Image from 'next/image'
import typography from '@/styles/typography.module.scss'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import docker from '@/assets/images/docker.png'
import laravel from '@/assets/images/laravel.png'
import nextjs from '@/assets/images/nextjs.png'
import nextjsBlack from '@/assets/images/nextjs-black.png'
import php from '@/assets/images/php.png'
import typescript from '@/assets/images/typescript.png'
import { useTheme } from '@/providers/ThemeProvider'

const favourites = [
  { name: 'laravel', icon: laravel },
  { name: 'nextjs', icon: { light: nextjsBlack, dark: nextjs } },
  { name: 'php', icon: php },
  { name: 'typescript', icon: typescript },
  { name: 'docker', icon: docker },
]

export const FavouriteSection = () => {
  const t = useTranslations('Home')
  const { theme } = useTheme()

  return (
    <section className={styles.section}>
      <h2 className={typography['headline-small']}>
        {t('fav_lang_section.title')}
      </h2>
      <ul className={styles.favoriteLanguagesAndTools}>
        {favourites.map(({ name, icon }) => (
          <li
            key={name}
            className={clsx(
              styles.favoriteLanguagesAndTools__item,
              typography['screen-expanded-body-large']
            )}
          >
            <div className={styles.favoriteLanguagesAndTools__icon} aria-hidden>
              <Image
                src={'light' in icon ? icon[theme.mode] : icon}
                alt={`${name} logo`}
                sizes="(min-width: 840px) 48px, 32px"
                fill
              />
            </div>
            {t(`fav_lang_section.${name}` as any)}
          </li>
        ))}
      </ul>
    </section>
  )
}
