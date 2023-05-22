import styles from '@/styles/components/Navigation.module.scss'
import { NavigationSegment } from './NavigationSegment'
import { DarkModeToggleFab } from './DarkModeToggleFab'

const destinations = [
  {
    name: 'home',
    href: '/',
    icon: 'home',
    exact: true,
  },
  {
    name: 'blog',
    href: '/blog',
    icon: 'article',
    exact: false,
  },
  {
    name: 'guestbook',
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
        <DarkModeToggleFab />
      </div>
    </div>
  )
}

export default Navigation
