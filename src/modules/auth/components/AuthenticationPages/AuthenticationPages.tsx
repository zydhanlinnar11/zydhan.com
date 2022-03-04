import FullscreenLoading from '@/common/components/elements/FullscreenLoading'
import { useUserState } from '@/common/providers/UserProvider'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import useAuthenticationPageStatus from '../../hooks/useAuthenticationPageStatus'

const AuthenticationPages: FC = ({ children }) => {
  const userState = useUserState()
  const router = useRouter()
  const { state, dispatch } = useAuthenticationPageStatus()

  const nextPath = router.query['next']
  if (userState.state !== 'unauthenticated') {
    let redirectTo = '/'
    try {
      redirectTo = new URL(`${nextPath}`).toString()
    } catch (e) {}
    if (userState.state === 'authenticated') router.push(redirectTo.toString())
    return <FullscreenLoading />
  }

  return <>{children}</>
}

export default AuthenticationPages
