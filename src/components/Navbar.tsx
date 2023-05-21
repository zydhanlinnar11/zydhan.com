import styles from '@/styles/components/Navbar.module.scss'
import { NavbarSegment } from './NavbarSegment'

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

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar__destinations}>
        {destinations.map((destination) => (
          <NavbarSegment key={destination.href} {...destination} />
        ))}
      </nav>
    </div>
  )
}

export default Navbar
