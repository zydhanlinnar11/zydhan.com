import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import useCSRFCookie from '@/common/hooks/useCSRFCookie'
import { useUser } from '@/common/providers/UserProvider'
import SocialMediaLoginButton from '../../Button/SocialMediaLoginButton'

const LoginPage = () => {
  useCSRFCookie()
  const { user } = useUser()
  const { socialMediaList } = useSocialMediaList()

  return (
    <>
      <p>LoginPage</p>
      <p>{!user ? 'Currently unauthenticated' : `Hello ${user.name}`}</p>
      {socialMediaList?.map((socialMedia) => (
        <SocialMediaLoginButton
          socialMedia={socialMedia}
          key={socialMedia.id}
        />
      ))}
    </>
  )
}

export default LoginPage
