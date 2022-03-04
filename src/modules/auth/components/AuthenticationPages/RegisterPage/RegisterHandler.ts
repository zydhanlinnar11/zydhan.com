import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterHandler = async (
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string
) => {
  if (!name) {
    toast.error('Name must be filled', {
      theme: 'dark',
    })
    return
  }
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
  if (passwordConfirm !== password) {
    toast.error('Password confirmation must match', {
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
    await instance.post('/auth/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirm,
    })

    toast.success('User sucessfully registered.', {
      theme: 'dark',
    })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || e.message, {
      theme: 'dark',
    })
  }
}

export default RegisterHandler
