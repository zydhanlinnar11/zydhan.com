import styles from '../styles/TitleBox.module.css'

interface TitleBoxProps {
  title: string
  backgroundURL: string
}

const TitleBox = (props: TitleBoxProps) => {
  const { title, backgroundURL } = props
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundURL})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className={styles['title-box-container']}
    >
      <h1 className={styles['title-box-post-title']}>{title}</h1>
    </div>
  )
}

export default TitleBox
