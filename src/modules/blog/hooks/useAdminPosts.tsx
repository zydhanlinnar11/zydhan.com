import useSWR from 'swr'
import fetcher from '@/utils/AxiosSWRFetcher'
import config from '@/common/config'

type Post = {
  id: string
  title: string
  cover_url: string
  slug: string
  created_at: string
}

const useAdminPosts = () => {
  const { data, error } = useSWR<Post[]>(
    `${config.apiUrl}/blog/admin/posts`,
    fetcher
  )

  return {
    posts: data,
    loading: !data && !error,
    error,
  }
}

export default useAdminPosts
