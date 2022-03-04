import axios from 'axios'
import { toast } from 'react-toastify'

const handleError = (e: unknown) => {
  if (axios.isAxiosError(e))
    toast.error(e.message, {
      theme: 'dark',
    })
  else
    toast.error('Unknown error', {
      theme: 'dark',
    })
}

export default handleError
