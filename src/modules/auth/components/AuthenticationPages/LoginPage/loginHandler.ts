import axios from 'axios'
import { toast } from 'react-toastify'

const loginHandler = async (email?: string, password?: string) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  })

  await instance.get('/sanctum/csrf-cookie')
  await instance.post('/auth/login', {
    email,
    password,
  })

  toast.success('Successfully logged in.', {
    theme: 'dark',
  })
}

export default loginHandler
