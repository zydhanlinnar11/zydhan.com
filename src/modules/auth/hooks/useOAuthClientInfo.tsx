import useSWRImmutable from 'swr/immutable'
import { OAuthClientInfo } from '@/auth/types/OAuthClientInfo'
import { backendFetcher } from '@/common/hooks/useAxios'
import { useRouter } from 'next/router'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { AxiosError, AxiosResponse } from 'axios'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'

const useOAuthClientInfo = () => {
  const router = useRouter()
  const params = convertQueryToSearchParams(router.query)
  params.delete('oauth')
  const { data, error, isLoading } = useSWRImmutable<
    AxiosResponse<OAuthClientInfo>,
    AxiosError<AuthorizationError>
  >(`/oauth/clients/info?${params.toString()}`, backendFetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry if it is displaying OAuth2 error.
      if (error.response?.data?.data?.action === 'display') return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })

  return {
    client: data?.data,
    isLoading,
    error,
  }
}

export default useOAuthClientInfo
