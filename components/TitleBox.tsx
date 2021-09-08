import styles from '../styles/TitleBox.module.css'
import Image from 'next/image'

interface TitleBoxProps {
  title: string
  backgroundURL: string
}

const TitleBox = ({ title, backgroundURL }: TitleBoxProps) => {
  return (
    <div className={styles['title-box-container']}>
      <Image
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        src={backgroundURL}
        id={styles['title-box-background']}
      ></Image>
      <h1 className={styles['title-box-post-title']}>{title}</h1>
    </div>
  )
}

export default TitleBox
