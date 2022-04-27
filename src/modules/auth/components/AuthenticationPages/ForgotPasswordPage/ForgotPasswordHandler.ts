import { axiosAPI } from '@/common/utils/AxiosInstance'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const ForgotPasswordHandler = async (email?: string) => {
  if (!email) {
    toast.error('Email must be filled', {
      theme: 'dark',
    })
    return
  }

  try {
    const res = await axiosAPI.post('/auth/user/forgot-password', { email })

    toast.success('Check your email for reset password link', {
      theme: 'dark',
    })
  } catch (e) {
    if (!(e instanceof AxiosError)) throw e

    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default ForgotPasswordHandler
