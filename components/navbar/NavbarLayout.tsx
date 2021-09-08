import styles from '../../styles/Navbar.module.css'
import blogConfig from '../../utilities/config'
import getNavbarButtons from './NavbarButtons'

function NavbarLayout() {
  return (
    <header id={styles.header}>
      <div id={styles.titleNavContainer}>
        <h1 id={styles.navTitle}>{blogConfig.getBlogName()}</h1>
        <nav id={styles.nav}>
          <div className={styles.navBtnGroup}>{getNavbarButtons()}</div>
        </nav>
      </div>
    </header>
  )
}

export default NavbarLayout
