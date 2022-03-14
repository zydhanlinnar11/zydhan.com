import { axiosAPI } from '@/common/utils/AxiosInstance'
import { toast } from 'react-toastify'

const registerHandler = async (
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string
) => {
  await axiosAPI.get('/sanctum/csrf-cookie')
  await axiosAPI.post('/auth/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirm,
  })

  toast.success('User sucessfully registered.', {
    theme: 'dark',
  })
}

export default registerHandler
