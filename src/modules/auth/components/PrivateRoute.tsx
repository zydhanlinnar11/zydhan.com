import NarrowPageContainer from '@/common/components/NarrowPageContainer'
import { useUserState } from '@/common/providers/UserProvider'
import FullscreenLoading from '@/common/components/FullscreenLoading'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'

const PrivateRoute: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { state } = useUserState()
  const router = useRouter()

  useEffect(() => {
    if (state !== 'unauthenticated') return
    router.push(`/auth/login?next=${encodeURIComponent(location.href)}`)
  }, [state])

  return (
    <NarrowPageContainer>
      {state === 'authenticated' ? <>{children}</> : <FullscreenLoading />}
    </NarrowPageContainer>
  )
}

export default PrivateRoute
