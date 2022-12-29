import { useRouter } from 'next/router'
import { useRefetchUser, useUser } from '@/common/providers/UserProvider'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { ComponentType, FC, PropsWithChildren } from 'react'
import { backendFetcher } from '@/common/hooks/useAxios'

const withAuthorizationRoute = <P,>(Component: ComponentType<P>) => {
  const ComponentWithProps = (props: P) => (
    <AuthorizationRoute>
      <Component {...props} />
    </AuthorizationRoute>
  )

  return ComponentWithProps
}

const AuthorizationRoute: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useUser()
  const router = useRouter()
  const refetchUser = useRefetchUser()

  if (state === 'UNAUTHENTICATED') {
    const params = convertQueryToSearchParams(router.query)
    params.append('oauth', 'true')

    router.push(`/auth/login?${params.toString()}`)
  }
  if (state === 'LOADING' || state === 'UNAUTHENTICATED') return <p>Loading</p>

  if (router.query.prompt === 'login') {
    delete router.query.prompt
    backendFetcher.delete('/auth/logout').then(() => {
      refetchUser && refetchUser()
    })
    return <></>
  }

  return <>{children}</>
}

export default withAuthorizationRoute
