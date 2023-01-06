import { useUser } from '@/common/providers/UserProvider'
import { ComponentType, FC, PropsWithChildren } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import useRedirectToLogin from './useRedirectToLogin'
import { User } from '@/common/types/User'

const withPrivateRoute = <P,>(
  Component: ComponentType<P & { user: User }>,
  redirectBackNeeded = true
) => {
  const ComponentWithProps = (props: P) => (
    <PrivateRoute
      redirectBackNeeded={redirectBackNeeded}
      Component={Component}
      props={props}
    />
  )

  return ComponentWithProps
}

type Props<P> = {
  redirectBackNeeded: boolean
  Component: ComponentType<P & { user: User }>
  props: P
}

const PrivateRoute: FC<PropsWithChildren<Props<any & { user: User }>>> = ({
  redirectBackNeeded,
  Component,
  props,
}) => {
  const { state, user } = useUser()
  useRedirectToLogin(redirectBackNeeded)

  if (state === 'UNAUTHENTICATED' || state === 'LOADING') return <LoadingPage />
  return <Component {...props} user={user} />
}

export default withPrivateRoute
