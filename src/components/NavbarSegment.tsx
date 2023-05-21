'use client'
import typograpy from '@/styles/typography.module.scss'
import styles from '@/styles/components/Navbar.module.scss'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'

type Props = { href: string; icon: string; name: string; exact: boolean }

export const NavbarSegment = ({ exact, href, icon, name }: Props) => {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      className={clsx(
        typograpy['label-medium'],
        isActive && styles['navbar__segment--active'],
        styles.navbar__segment
      )}
      href={href}
    >
      <div className={styles.navbar__iconContainer} aria-hidden={true}>
        <div
          className={clsx(
            styles.navbar__iconStateLayer,
            isActive && styles['navbar__iconStateLayer--active']
          )}
        >
          <span
            className={clsx(
              styles.navbar__icon,
              isActive && styles['navbar__icon--active']
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
