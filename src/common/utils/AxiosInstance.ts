import axios from 'axios'
import config from '@/common/config'

export const axiosAPI = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
})
