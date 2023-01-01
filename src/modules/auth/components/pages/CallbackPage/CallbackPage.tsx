import useSocialMediaCallback from '@/auth/hooks/useSocialMediaCallback'
import LoadingPage from '@/common/components/Pages/LoadingPage'

const CallbackPage = () => {
  useSocialMediaCallback()

  return <LoadingPage />
}

export default CallbackPage
