import { axiosAPI } from '@/common/utils/AxiosInstance'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const ResetPasswordHandler = async (
  email?: string,
  password?: string,
  passwordConfirmation?: string,
  token?: string
) => {
  if (!password) {
    toast.error('Password must be filled', {
      theme: 'dark',
    })
    return
  }
  if (passwordConfirmation !== password) {
    toast.error('Password confirmation must match', {
      theme: 'dark',
    })
    return
  }

  try {
    const res = await axiosAPI.post('/auth/user/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })

    toast.success(res.data?.message ?? 'Password has been reset', {
      theme: 'dark',
    })
  } catch (e) {
    if (!(e instanceof AxiosError)) throw e
    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default ResetPasswordHandler
