import useSWR from 'swr'
import { backendFetcher } from '@/common/hooks/useAxios'
import { Guestbook } from '@/guestbook/types/Guestbook'

const useGuestbooks = () => {
  const { data, error, isLoading, mutate } = useSWR<{ data: Guestbook[] }>(
    '/api/guestbook/guestbooks',
    backendFetcher
  )

  return {
    guestbooks: data?.data,
    isLoading,
    isError: error,
    revalidate: mutate,
  }
}

export default useGuestbooks
