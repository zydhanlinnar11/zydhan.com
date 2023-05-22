import styles from '@/styles/pages/Home.module.scss'
import { Header } from './Header'
import { FavouriteSection } from './FavouriteSection'
import { ExperiencesSection } from './ExperiencesSection'
import { RecentRepositoriesSection } from './RecentRepositoriesSection'

export default function Home() {
  return (
    <div className={styles.container__wrapper}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <FavouriteSection />
          <ExperiencesSection />
          <RecentRepositoriesSection />
        </main>
      </div>
    </div>
  )
}
