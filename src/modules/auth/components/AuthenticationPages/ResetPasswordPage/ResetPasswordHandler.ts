import axios from 'axios'

const ResetPasswordHandler = async (
  email?: string,
  password?: string,
  passwordConfirmation?: string,
  token?: string
) => {
  // dispatch({ status: 'PROCESSING' })
  if (!email) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Email must be filled' })
    return
  }
  if (!password) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Password must be filled' })
    return
  }
  if (passwordConfirmation !== password) {
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: 'Password confirmation should match',
    //   })
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
    //   dispatch({ status: 'IDLE' })

    //   sessionStorage.setItem(
    //     'flash_success',
    //     JSON.stringify(res.data?.message ?? 'Password has been reset')
    //   )
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: e.response?.data?.message || e.message,
    //   })
  }
}

export default ResetPasswordHandler
