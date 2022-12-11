import useAxios from '@/common/hooks/useAxios'

const useCSRFCookie = () => {
  useAxios({
    method: 'get',
    url: '/sanctum/csrf-cookie',
    withCredentials: true,
  })
}

export default useCSRFCookie
