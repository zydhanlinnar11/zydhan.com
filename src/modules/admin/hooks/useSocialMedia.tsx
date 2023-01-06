import { backendFetcher } from '@/common/hooks/useAxios'
import useSWR from 'swr'
import { SocialMedia } from '@/admin/types/SocialMedia'

const useSocialMedia = (id?: string) => {
  const { data, error, isLoading } = useSWR<{ data: SocialMedia }>(
    id ? `/admin/social-media/${id}` : null,
    backendFetcher
  )

  return {
    socialMedia: data?.data,
    isLoading,
    isError: error,
  }
}

export default useSocialMedia
