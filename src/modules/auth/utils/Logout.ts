import axios from 'axios'

const logout = async () => {
  await axios.delete(process.env.NEXT_PUBLIC_API_URL + '/auth/logout', {
    withCredentials: true,
  })
}

export default logout
