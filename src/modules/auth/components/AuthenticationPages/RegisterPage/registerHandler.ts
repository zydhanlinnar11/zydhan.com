import axios from 'axios'
import { toast } from 'react-toastify'

const registerHandler = async (
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string
) => {
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
}

export default registerHandler
