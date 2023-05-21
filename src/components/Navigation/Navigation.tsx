import styles from '@/styles/components/Navigation.module.scss'
import { NavigationSegment } from './NavigationSegment'
import clsx from 'clsx'

const destinations = [
  {
    name: 'Home',
    href: '/',
    icon: 'home',
    exact: true,
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: 'article',
    exact: false,
  },
  {
    name: 'Guestbook',
    href: '/guestbook',
    icon: 'book',
    exact: false,
  },
]

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <nav className={styles.navigation__destinations}>
        {destinations.map((destination) => (
          <NavigationSegment key={destination.href} {...destination} />
        ))}
      </nav>
      <div className={styles.navigation__menuAndFab}>
        <div className={styles.navigation__fab}>
          <button
            className={styles.navigation__fabStateLayer}
            aria-label={`Toggle dark mode`}
          >
            <span className={clsx(styles.navigation__icon)} aria-hidden={true}>
              dark_mode
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navigation
