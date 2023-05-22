import styles from '@/styles/pages/Home.module.scss'
import Image from 'next/image'
import siteLogo from '@/assets/images/site-logo.webp'
import typography from '@/styles/typography.module.scss'

export default function Home() {
  return (
    <div className={styles.container__wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Image src={siteLogo} width={64} height={64} alt={'Site logo'} />
          <h1 className={typography['headline-medium']}>Zydhan Linnar Putra</h1>
          <p>Full-stack Web Developer</p>
          <p className={typography['body-small']}>
            Hello friends! You can call me Zydhan. I'm web development
            enthusiast with 2 year of experiences and currently study to become
            Bachelor of Informatics Engineering at Sepuluh Nopember Institute of
            Technology Surabaya.
          </p>
        </header>

        <main></main>
      </div>
    </div>
  )
}
