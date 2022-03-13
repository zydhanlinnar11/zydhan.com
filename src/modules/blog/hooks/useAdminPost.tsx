import useSWR from 'swr'
import fetcher from '@/utils/AxiosSWRFetcher'
import Post from '../types/admin/Post'
import { useRouter } from 'next/router'

const useAdminPost = () => {
  const router = useRouter()
  const id = router.query.id
  const { data, error } = useSWR<Post>(
    typeof id === 'string'
      ? `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/posts/${id}`
      : null,
    fetcher
  )

  return {
    post: data,
    loading: !data && !error,
    error,
  }
}

export default useAdminPost
