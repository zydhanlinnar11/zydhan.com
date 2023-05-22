'use client'
import { useTheme } from '@/providers/ThemeProvider'
import styles from '@/styles/components/Navigation.module.scss'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

export const DarkModeToggleFab = () => {
  const {
    theme: { mode },
    setTheme,
  } = useTheme()
  const isDarkMode = mode === 'dark'
  const t = useTranslations('Navigation')

  return (
    <div className={styles.navigation__fab}>
      <button
        className={styles.navigation__fabStateLayer}
        aria-label={
          isDarkMode ? t('switch_to_light_mode') : t('switch_to_dark_mode')
        }
        onClick={() => setTheme({ mode: mode === 'light' ? 'dark' : 'light' })}
      >
        <span className={clsx(styles.navigation__icon)} aria-hidden={true}>
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  )
}
