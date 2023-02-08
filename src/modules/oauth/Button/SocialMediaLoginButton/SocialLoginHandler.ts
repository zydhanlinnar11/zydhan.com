const socialLoginHandler = (
  name: string,
  redirectUrl: string,
  callback: () => void
) => {
  window.open(`${redirectUrl}`, '_self')
}

export default socialLoginHandler
