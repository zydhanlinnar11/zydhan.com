import { ComponentType, FC, PropsWithChildren } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import { User } from '@/common/types/User'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

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
  const { replace } = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      replace({
        pathname: '/auth/login',
        query: redirectBackNeeded
          ? {
              redirect: window.location.href,
            }
          : undefined,
      })
    },
  })

  if (!session?.user) return <LoadingPage />
  return <Component {...props} user={session.user} />
}

export default withPrivateRoute
