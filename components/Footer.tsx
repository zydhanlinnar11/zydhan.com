import styles from '../styles/Footer.module.css'
import blogConfig from '../utilities/config'

const Footer = () => {
  return (
    <footer id={styles.footer}>
      <div className={styles.horizontalLine} />
      <div className={styles.footerInnerContainer}>
        <h4 className={styles.footerText}>{blogConfig.getBlogName()}</h4>
        <div className={styles.verticalLine} />
        <h4 className={styles.footerText}>{blogConfig.getRightFooterText()}</h4>
      </div>
    </footer>
  )
}

export default Footer
