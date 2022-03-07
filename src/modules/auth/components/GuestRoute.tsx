import FullscreenLoading from '@/common/components/FullscreenLoading'
import { useUserState } from '@/common/providers/UserProvider'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

const GuestRoute: FC = ({ children }) => {
  const { state } = useUserState()
  const router = useRouter()

  useEffect(() => {
    if (state !== 'authenticated') return

    try {
      const nextPath = router.query['next']
      const redirectTo = new URL(`${nextPath}`)
      router.replace(redirectTo.toString())
    } catch (e) {
      router.replace('/')
    }
  }, [state])

  return state === 'unauthenticated' ? <>{children}</> : <FullscreenLoading />
}

export default GuestRoute
