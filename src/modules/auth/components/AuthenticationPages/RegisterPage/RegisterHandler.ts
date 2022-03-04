import axios from 'axios'

const RegisterHandler = async (
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string
) => {
  // dispatch({ status: 'PROCESSING' })
  if (!name) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Name must be filled' })
    return
  }
  if (!email) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Email must be filled' })
    return
  }
  if (!password) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Password must be filled' })
    return
  }
  if (passwordConfirm !== password) {
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: 'Password confirmation must match',
    //   })
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
    //   dispatch({ status: 'IDLE' })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: e.response?.data?.message || e.message,
    //   })
  }
}

export default RegisterHandler
