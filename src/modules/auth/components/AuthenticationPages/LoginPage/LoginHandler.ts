import axios from 'axios'

const LoginHandler = async (email?: string, password?: string) => {
  // dispatch({ status: 'PROCESSING' })
  if (!email) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Email must be filled' })
    return
  }
  if (!password) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Password must be filled' })
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
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: e.response?.data?.message || e.message,
    //   })
  }
}

export default LoginHandler
