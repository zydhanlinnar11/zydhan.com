import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import { useUserState } from '@/common/providers/UserProvider'
import FullscreenLoading from '@/common/components/FullscreenLoading'
import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

const AdminRoute: FC = ({ children }) => {
  const userState = useUserState()
  const router = useRouter()

  useEffect(() => {
    if (userState.state === 'authenticated' && !userState.user.admin) {
      router.push('/403')
      return
    }
    if (userState.state !== 'unauthenticated') return
    router.push(`/auth/login?next=${encodeURIComponent(location.href)}`)
  }, [userState.state])

  return (
    <NarrowPageContainer>
      {userState.state === 'authenticated' && userState.user.admin ? (
        <>{children}</>
      ) : (
        <FullscreenLoading />
      )}
    </NarrowPageContainer>
  )
}

export default AdminRoute
