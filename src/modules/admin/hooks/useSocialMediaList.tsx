import { backendFetcher } from '@/common/hooks/useAxios'
import useSWR from 'swr'
import { SocialMediaListItem } from '@/admin/types/SocialMediaListItem'

const useSocialMediaList = () => {
  const { data, error, isLoading, mutate } = useSWR<{
    data: SocialMediaListItem[]
  }>('/admin/social-media', backendFetcher)

  return {
    socialMediaList: data?.data,
    isLoading,
    isError: error,
    revalidate: mutate,
  }
}

export default useSocialMediaList
