import { backendFetcher } from '@/common/hooks/useAxios'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AuthorizationConsentData } from '@/oauth/types/AuthorizationConsentData'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'

const useAuthorization = () => {
  const { query } = useRouter()
  const params = convertQueryToSearchParams(query)

  const { data, error, isLoading } = useSWR<
    AxiosResponse<AuthorizationConsentData | AuthorizationSuccess>,
    AxiosError<AuthorizationError>
  >(`/oauth/authorize?${params.toString()}`, backendFetcher)

  return {
    data: data?.data,
    error,
    isLoading,
  }
}

export default useAuthorization
