const socialLoginHandler = (
  name: string,
  redirectUrl: string,
  callback: () => void
) => {
  const width = 500
  const height = 400
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2.5

  const popup = window.open(
    `${redirectUrl}`,
    `Sign in with ${name}`,
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
