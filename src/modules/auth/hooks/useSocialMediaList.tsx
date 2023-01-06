import { backendFetcher } from '@/common/hooks/useAxios'
import useSWR from 'swr'
import { SocialMedia } from '@/auth/types/SocialMedia'

const useSocialMediaList = () => {
  const { data, error, isLoading } = useSWR<{ data: SocialMedia[] }>(
    '/auth/social-media',
    backendFetcher
  )

  return {
    socialMediaList: data?.data,
    isLoading,
    isError: error,
  }
}

export default useSocialMediaList
