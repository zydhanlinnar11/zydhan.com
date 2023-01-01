import { useUser } from '@/common/providers/UserProvider'
import { ComponentType, FC, PropsWithChildren } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import useRedirectToLogin from './useRedirectToLogin'

const withPrivateRoute = <P,>(
  Component: ComponentType<P>,
  redirectBackNeeded = true
) => {
  const ComponentWithProps = (props: P) => (
    <PrivateRoute redirectBackNeeded={redirectBackNeeded}>
      {/* @ts-ignore */}
      <Component {...props} />
    </PrivateRoute>
  )

  return ComponentWithProps
}

type Props = {
  redirectBackNeeded: boolean
}

const PrivateRoute: FC<PropsWithChildren<Props>> = ({
  children,
  redirectBackNeeded,
}) => {
  const { state } = useUser()
  useRedirectToLogin(redirectBackNeeded)

  if (state === 'UNAUTHENTICATED' || state === 'LOADING') return <LoadingPage />
  return <>{children}</>
}

export default withPrivateRoute
