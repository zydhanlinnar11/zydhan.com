import useSWR from 'swr'
import { backendFetcher } from '@/common/hooks/useAxios'
import { AxiosResponse } from 'axios'

const useLinkedSocialMedia = () => {
  const { data, error, isLoading, mutate } = useSWR<AxiosResponse<string[]>>(
    '/api/auth/users/linked-social-media',
    backendFetcher
  )

  return { linked: data?.data, error, isLoading, refetch: mutate }
}

export default useLinkedSocialMedia
