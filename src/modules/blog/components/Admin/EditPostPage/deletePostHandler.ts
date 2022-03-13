import axios from 'axios'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'

const deletePostHandler = async (id: string, router: NextRouter) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/posts/${id}`,
      {
        withCredentials: true,
      }
    )
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
