import axios from 'axios'

const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data)

export default fetcher
