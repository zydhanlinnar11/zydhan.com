import axios, { AxiosResponse } from 'axios'
import User from '../types/User'

const fetchUser = async () => {
  const res = await axios.get<any, AxiosResponse<User, any>, any>(
    process.env.NEXT_PUBLIC_API_URL + '/auth/authenticated-user',
    {
      withCredentials: true,
    }
  )

  return res.data
}

export default fetchUser
