import useSWR from 'swr'
import { OAuthClientInfo } from '@/auth/types/OAuthClientInfo'
import { backendFetcher } from '@/common/hooks/useAxios'
import { useRouter } from 'next/router'
import { convertQueryToSearchParams } from '@/common/tools/ConvertQueryToSearchParams'

const useOAuthClientInfo = () => {
  const router = useRouter()
  const params = convertQueryToSearchParams(router.query)
  params.delete('oauth')
  const { data, error, isLoading } = useSWR<{ data: OAuthClientInfo }>(
    `/oauth/clients/info?${params.toString()}`,
    backendFetcher
  )

  return {
    client: data?.data,
    isLoading,
    error,
  }
}

export default useOAuthClientInfo
