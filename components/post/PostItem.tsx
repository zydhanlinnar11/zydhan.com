import styles from '../../styles/PostItem.module.css'
import Button from '@material-ui/core/Button'
import { createTheme, Theme, ThemeProvider } from '@material-ui/core/styles'
import Image from 'next/image'

const noPaddingTextButton: Theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        padding: '0',
        color: 'var(--main-font-color)',
        transition: 'color var(--transition-delay)',
      },
      root: {
        background: 'var(--card-background)',
      },
    },
  },
})

interface PostItemProps {
  title: string
  localDate: string
  description: string
  thumbnailURL: string
  customTheme?: Theme
}

function PostItem(props: PostItemProps) {
  const { title, localDate, description, thumbnailURL, customTheme } = props
  return (
    <ThemeProvider theme={customTheme ? customTheme : noPaddingTextButton}>
      <Button
        style={{ width: '100%' }}
        className={styles['post-item-container']}
      >
        <Image
          width={192}
          height={320}
          src={thumbnailURL}
          alt={`Thumbnail of ${title}`}
        />
        <div className={styles['right-container']}>
          <h2 className={styles['post-title']}>{title}</h2>
          <h3 className={styles['post-date']}>{localDate}</h3>
          <p className={styles['post-desc']}>{description}</p>
        </div>
      </Button>
    </ThemeProvider>
  )
}

export default PostItem
