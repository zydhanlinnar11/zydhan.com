import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUser } from '@/common/providers/UserProvider'

const useRedirectToLogin = (redirectBackNeeded: boolean) => {
  const { state } = useUser()
  const { replace } = useRouter()

  useEffect(() => {
    if (state === 'UNAUTHENTICATED') {
      replace({
        pathname: '/auth/login',
        query: redirectBackNeeded
          ? { redirect: window.location.href }
          : undefined,
      })
    }
  }, [state, replace, redirectBackNeeded])
}

export default useRedirectToLogin
