import styles from '@/styles/pages/Home.module.scss'
import { Header } from './Header'
import { FavouriteSection } from './FavouriteSection'

export default function Home() {
  return (
    <div className={styles.container__wrapper}>
      <div className={styles.container}>
        <Header />
        <main>
          <FavouriteSection />
        </main>
      </div>
    </div>
  )
}
