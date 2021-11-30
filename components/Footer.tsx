import BlogConfig from '../config/BlogConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const socialMedia = [
  {
    icon: faGithub,
    url: 'https://github.com/zydhanlinnar11',
    key: 'github',
  },
  {
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/zydhanlinnar11',
    key: 'linkedin',
  },
]

export default function Footer() {
  return (
    <footer
      className='h-7 mx-auto text-gray-300 mb-5'
      style={{
        maxWidth: '980px',
        paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
        paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
      }}
    >
      <div className='h-px w-full bg-divider-primary'></div>
      <div className='flex justify-between mt-2'>
        <div>
          <small>
            © {new Date().getFullYear()} {BlogConfig.BLOG_TITLE}.
          </small>
        </div>
        <div className='flex gap-3'>
          {socialMedia.map((item) => (
            <a
              href={item.url}
              key={item.key}
              target='_blank'
              className='max-h-3 max-w-3 hover:text-gray-100 focus:text-white'
            >
              <FontAwesomeIcon icon={item.icon} size='lg' />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
