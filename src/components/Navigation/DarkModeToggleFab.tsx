'use client'
import { useTheme } from '@/providers/ThemeProvider'
import styles from '@/styles/components/Navigation.module.scss'
import clsx from 'clsx'

export const DarkModeToggleFab = () => {
  const {
    theme: { mode },
    setTheme,
  } = useTheme()

  return (
    <div className={styles.navigation__fab}>
      <button
        className={styles.navigation__fabStateLayer}
        aria-label={`Toggle dark mode`}
        onClick={() => setTheme({ mode: mode === 'light' ? 'dark' : 'light' })}
      >
        <span className={clsx(styles.navigation__icon)} aria-hidden={true}>
          dark_mode
        </span>
      </button>
    </div>
  )
}
