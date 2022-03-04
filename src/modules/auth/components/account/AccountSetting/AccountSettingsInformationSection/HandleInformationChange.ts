import axios from 'axios'
import { toast } from 'react-toastify'

const handleInformationChange = async (name?: string, email?: string) => {
  if (!name) {
    toast.error('Name must be filled', {
      theme: 'dark',
    })
    return
  }
  if (!email) {
    toast.error('Email must be filled', {
      theme: 'dark',
    })
    return
  }

  await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
    { name, email },
    {
      withCredentials: true,
    }
  )
}

export default handleInformationChange
