'use client'
import typograpy from '@/styles/typography.module.scss'
import styles from '@/styles/components/Navigation.module.scss'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'

type Props = { href: string; icon: string; name: string; exact: boolean }

export const NavigationSegment = ({ exact, href, icon, name }: Props) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      className={clsx(
        typograpy['label-medium'],
        isActive && styles['navigation__segment--active'],
        styles.navigation__segment
      )}
      href={href}
    >
      <div className={styles.navigation__iconContainer} aria-hidden={true}>
        <div
          className={clsx(
            styles.navigation__iconStateLayer,
            isActive && styles['navigation__iconStateLayer--active']
          )}
        >
          <span
            className={clsx(
              styles.navigation__icon,
              isActive && styles['navigation__icon--active']
            )}
          >
            {icon}
          </span>
        </div>
      </div>
      {name}
    </Link>
  )
}