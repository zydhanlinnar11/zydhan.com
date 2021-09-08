import { Button } from '@material-ui/core'
import styles from '../../styles/NavbarButton.module.css'

const HomeButton = (key: string) => {
  return (
    <Button
      key={key}
      className={styles.navBtn}
      onClick={() => {
        window.open('/', '_self')
      }}
    >
      <h6>Home</h6>
    </Button>
  )
}

const ResumeButton = (key: string) => {
  const RESUME_URL = 'https://zydhanlinnar11.github.io/resume/'
  return (
    <Button
      key={key}
      className={styles.navBtn}
      onClick={() => {
        window.open(RESUME_URL)
      }}
    >
      <h6>Resume</h6>
    </Button>
  )
}

const VerticalDivider = (key: string) => (
  <div key={key} className={styles.verticalBar}></div>
)

const navbarButtonsArray = [HomeButton, VerticalDivider, ResumeButton]

const getNavbarButtons = () => {
  let key = 0
  return navbarButtonsArray.map((item) => item(String(key++)))
}

export default getNavbarButtons
