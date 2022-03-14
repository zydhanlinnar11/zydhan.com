import { axiosAPI } from '@/common/utils/AxiosInstance'
import axios from 'axios'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'

const deletePostHandler = async (id: string, router: NextRouter) => {
  try {
    await axiosAPI.delete(`/blog/admin/posts/${id}`)
    toast.success('Post deleted successfully', { theme: 'dark' })
    router.push('/blog/admin/posts')
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || 'Failed to delete post', {
      theme: 'dark',
    })
  }
}

export default deletePostHandler
