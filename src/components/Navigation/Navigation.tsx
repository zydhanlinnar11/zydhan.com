import styles from '@/styles/components/Navigation.module.scss'
import { NavigationSegment } from './NavigationSegment'
import { DarkModeToggleFab } from './DarkModeToggleFab'

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
        <DarkModeToggleFab />
      </div>
    </div>
  )
}

export default Navigation
