import useAxios from '@/common/hooks/useAxios'

const useCSRFCookie = () => {
  useAxios('/sanctum/csrf-cookie', 'get')
}

export default useCSRFCookie
