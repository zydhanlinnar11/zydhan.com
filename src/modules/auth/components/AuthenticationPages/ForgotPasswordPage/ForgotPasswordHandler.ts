import axios from 'axios'

const ForgotPasswordHandler = async (email?: string) => {
  // dispatch({ status: 'PROCESSING' })
  if (!email) {
    //   dispatch({ status: 'IDLE', errorMessage: 'Email must be filled' })
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
    //   dispatch({
    //     status: 'IDLE',
    //     successMessage: 'Check your email for reset password link',
    //   })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    //   dispatch({
    //     status: 'IDLE',
    //     errorMessage: e.response?.data?.message || e.message,
    //   })
  }
}

export default ForgotPasswordHandler
