import { backendFetcher } from '@/common/hooks/useAxios'
import { useEffect } from 'react'

const useCSRFCookie = () => {
  useEffect(() => {
    backendFetcher.get('/sanctum/csrf-cookie')
  }, [])
}

export default useCSRFCookie
