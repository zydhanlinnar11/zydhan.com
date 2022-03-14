import { axiosAPI } from '@/common/utils/AxiosInstance'
import axios from 'axios'
import { toast } from 'react-toastify'

const editPostHandler = async (
  id: string,
  visibility: number,
  title?: string,
  description?: string,
  markdown?: string
) => {
  try {
    await axiosAPI.patch(`/blog/admin/posts/${id}`, {
      title,
      description,
      markdown,
      visibility,
    })
    toast.success('Post edited successfully', { theme: 'dark' })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || 'Failed to edit post', {
      theme: 'dark',
    })
  }
}

export default editPostHandler
