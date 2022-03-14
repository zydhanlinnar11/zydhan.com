import { axiosAPI } from '@/common/utils/AxiosInstance'

const logout = async () => {
  await axiosAPI.delete('/auth/logout')
}

export default logout
