import { useUser } from '@/common/providers/UserProvider'
import { useRouter } from 'next/router'
import { ComponentType, FC, PropsWithChildren, useEffect } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'

const withAuthRoute = <P,>(Component: ComponentType<P>) => {
  const ComponentWithProps = (props: P) => (
    <AuthRoute>
      {/* @ts-ignore */}
      <Component {...props} />
    </AuthRoute>
  )

  return ComponentWithProps
}

const AuthRoute: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useUser()
  useRedirectIntended()

  if (state === 'AUTHENTICATED' || state === 'LOADING') return <LoadingPage />
  return <>{children}</>
}

const useRedirectIntended = () => {
  const { state } = useUser()
  const { replace, query, isReady } = useRouter()

  useEffect(() => {
    if (state !== 'AUTHENTICATED' || !isReady) return
    const url = query.redirect
    const origin = window.location.origin
    if (typeof url !== 'string' || !url.startsWith(origin)) {
      replace('/')
      return
    }
    replace({ pathname: url.replace(origin, '') })
  }, [state, replace, isReady, query.redirect])
}

export default withAuthRoute
