import axios from 'axios'
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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/user/reset-password`,
      {
        token: token,
        email: email,
        password,
        password_confirmation: passwordConfirmation,
      },
      {
        withCredentials: true,
      }
    )

    toast.success(res.data?.message ?? 'Password has been reset', {
      theme: 'dark',
    })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default ResetPasswordHandler
