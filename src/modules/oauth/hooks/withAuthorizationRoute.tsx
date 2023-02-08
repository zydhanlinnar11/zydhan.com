import { useRouter } from 'next/router'
import { useRefetchUser, useUser } from '@/common/providers/UserProvider'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { ComponentType, FC, PropsWithChildren } from 'react'
import { backendFetcher } from '@/common/hooks/useAxios'
import LoadingPage from '@/common/components/Pages/LoadingPage'

const withAuthorizationRoute = <P,>(Component: ComponentType<P>) => {
  const ComponentWithProps = (props: P) => (
    <AuthorizationRoute>
      {/* @ts-ignore */}
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

    router.push(`/api/auth/login?${params.toString()}`)
  }
  if (state === 'LOADING' || state === 'UNAUTHENTICATED') return <LoadingPage />

  if (router.query.prompt === 'login') {
    delete router.query.prompt
    backendFetcher.delete('/oauth/logout').then(() => {
      refetchUser && refetchUser()
    })
    return <LoadingPage />
  }

  return <>{children}</>
}

export default withAuthorizationRoute
