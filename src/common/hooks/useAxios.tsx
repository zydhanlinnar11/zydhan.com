import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL = 'https://api.zydhan.dev'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Params = {
  url: string
  method: HttpMethod
  body?: object
  headers?: object
  withCredentials?: boolean
}

const useAxios = ({ body, headers, method, url, withCredentials }: Params) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)
  const axiosInstance = axios.create({ withCredentials, baseURL: BASE_URL })

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
