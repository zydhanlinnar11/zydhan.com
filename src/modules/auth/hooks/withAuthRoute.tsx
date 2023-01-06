import { useUser } from '@/common/providers/UserProvider'
import { useRouter } from 'next/router'
import { ComponentType, FC, PropsWithChildren, useEffect } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import useOAuthClientInfo from './useOAuthClientInfo'
import BadRequestPage from '@/common/components/Pages/BadRequestPage'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'

const withAuthRoute = <P,>(Component: ComponentType<P>) => {
  const ComponentWithProps = (props: P) => {
    const { state } = useUser()
    const { query } = useRouter()
    const { client, isLoading, error } = useOAuthClientInfo()
    useRedirectIntended()

    if (query.oauth === 'true' && error) return <BadRequestPage />

    if (state === 'AUTHENTICATED' || state === 'LOADING' || isLoading)
      return <LoadingPage />

    return <Component client={client} {...props} />
  }

  return ComponentWithProps
}

const useRedirectIntended = () => {
  const { state } = useUser()
  const { replace, query, isReady } = useRouter()

  useEffect(() => {
    if (state !== 'AUTHENTICATED' || !isReady) return
    if (query.oauth === 'true') {
      replace(
        `/oauth/authorize?${convertQueryToSearchParams(query).toString()}`
      )
      return
    }
    const url = query.redirect
    const origin = window.location.origin
    if (typeof url !== 'string' || !url.startsWith(origin)) {
      replace('/')
      return
    }
    replace({ pathname: url.replace(origin, '') })
  }, [state, replace, isReady, query])
}

export default withAuthRoute
