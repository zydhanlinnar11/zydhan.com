import { backendFetcher } from '@/common/hooks/useAxios'
import useSWR from 'swr'
import { SocialMediaListItem } from '@/admin/types/SocialMediaListItem'

const useSocialMediaList = () => {
  const { data, error, isLoading } = useSWR<{ data: SocialMediaListItem[] }>(
    '/admin/social-media',
    backendFetcher
  )

  return {
    socialMediaList: data?.data,
    isLoading,
    isError: error,
  }
}

export default useSocialMediaList
