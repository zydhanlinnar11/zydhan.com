import { backendFetcher } from '@/common/hooks/useAxios'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { AuthorizationConsentData } from '@/oauth/types/AuthorizationConsentData'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'

const useAuthorization = () => {
  const { query } = useRouter()
  const params = convertQueryToSearchParams(query)

  const { data, error, isLoading } = useSWRImmutable<
    AxiosResponse<AuthorizationConsentData | AuthorizationSuccess>,
    AxiosError<AuthorizationError>
  >(`/api/oauth/interactions/${query.uid}`, backendFetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry if it is displaying OAuth2 error.
      if (error.response?.data.data.action === 'display') return

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })

  return {
    data: data?.data,
    error,
    isLoading,
  }
}

export default useAuthorization
