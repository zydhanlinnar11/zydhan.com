import { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../config'

const BASE_URL = config.backendUrl
export const backendFetcher = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

const useAxios = (
  url: string,
  method: HttpMethod,
  body: object = {},
  headers: object = {},
  axiosInstance = backendFetcher
) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  const fetchData = () => {
    axiosInstance[method](url, headers, body)
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
