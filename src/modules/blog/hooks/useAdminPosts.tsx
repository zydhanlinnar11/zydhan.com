import useSWR from 'swr'
import fetcher from '@/utils/AxiosSWRFetcher'

type Post = {
  id: string
  title: string
  cover_url: string
  slug: string
  created_at: string
}

const useAdminPosts = () => {
  const { data, error } = useSWR<Post[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/posts`,
    fetcher
  )

  return {
    posts: data,
    loading: !data && !error,
    error,
  }
}

export default useAdminPosts
