import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPasswordHandler = async (email?: string) => {
  if (!email) {
    toast.error('Email must be filled', {
      theme: 'dark',
    })
    return
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    )

    toast.success('Check your email for reset password link', {
      theme: 'dark',
    })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e

    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default ForgotPasswordHandler
