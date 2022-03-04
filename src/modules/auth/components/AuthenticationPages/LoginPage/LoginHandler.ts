import axios from 'axios'
import { toast } from 'react-toastify'

const LoginHandler = async (email?: string, password?: string) => {
  if (!email) {
    toast.error('Email must be filled', {
      theme: 'dark',
    })
    return
  }
  if (!password) {
    toast.error('Password must be filled', {
      theme: 'dark',
    })
    return
  }

  try {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    })

    await instance.get('/sanctum/csrf-cookie')
    await instance.post('/auth/login', {
      email,
      password,
    })

    // fetchUser()

    toast.success('Successfully logged in.', {
      theme: 'dark',
    })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default LoginHandler
