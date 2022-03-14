import { axiosAPI } from '@/common/utils/AxiosInstance'
import { toast } from 'react-toastify'

const loginHandler = async (email?: string, password?: string) => {
  await axiosAPI.get('/sanctum/csrf-cookie')
  await axiosAPI.post('/auth/login', {
    email,
    password,
  })

  toast.success('Successfully logged in.', {
    theme: 'dark',
  })
}

export default loginHandler
