import FullscreenLoading from '@/common/components/FullscreenLoading'
import { useUserState } from '@/common/providers/UserProvider'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren, useEffect } from 'react'
import useNextPath from '../hooks/useNextPath'

const GuestRoute: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { state } = useUserState()
  const router = useRouter()
  const nextPath = useNextPath()

  useEffect(() => {
    if (state !== 'authenticated') return

    try {
      const redirectTo = new URL(nextPath.replace(/javascript:/g, ''))
      router.replace(redirectTo.toString())
    } catch (e) {
      router.replace('/')
    }
  }, [state, nextPath])

  return state === 'unauthenticated' ? <>{children}</> : <FullscreenLoading />
}

export default GuestRoute
