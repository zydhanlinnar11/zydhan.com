import { axiosAPI } from '@/common/utils/AxiosInstance'
import { AxiosResponse } from 'axios'
import User from '../types/User'

const fetchUser = async () => {
  const res = await axiosAPI.get<any, AxiosResponse<User, any>, any>(
    '/auth/authenticated-user'
  )

  return res.data
}

export default fetchUser
