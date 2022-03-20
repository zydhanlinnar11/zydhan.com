import useSWR from 'swr'
import Comment from '@/modules/blog/types/admin/Comment'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import config from '@/common/config'

const fetcher = (url: string) => axiosAPI.get(url).then((res) => res.data)

const useComments = (postSlug: string) => {
  const { data, error, mutate } = useSWR<Comment[]>(
    `${config.apiUrl}/blog/posts/${postSlug}/comments`,
    fetcher
  )

  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

export default useComments
