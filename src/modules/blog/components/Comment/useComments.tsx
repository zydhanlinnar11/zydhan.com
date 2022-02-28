import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export type Comment = {
  id: string
  user_name: string
  comment: string
  createdAt: string
}

type Response = {
  status: 'success'
  data: Comment[]
}

const useComments = (postSlug: string) => {
  const { data, error } = useSWR<Response>(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/posts/${postSlug}/comments`,
    fetcher
  )
  return {
    comments: data?.data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useComments
