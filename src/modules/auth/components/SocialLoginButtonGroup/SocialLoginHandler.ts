import config from '@/common/config'
import SocialProvider from '@/modules/auth/types/SocialProvider'

const socialLoginHandler = (provider: SocialProvider, callback: () => void) => {
  const width = 500
  const height = 400
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2.5

  const popup = window.open(
    `${config.apiUrl}/auth/${provider}/redirect`,
    `Sign in with ${provider}`,
    `width=${width},height=${height},left=${left},top=${top}`
  )

  const interval = setInterval(() => {
    if (!popup || popup.closed) {
      interval && clearInterval(interval)
      callback()
      return
    }
  }, 500)
}

export default socialLoginHandler
