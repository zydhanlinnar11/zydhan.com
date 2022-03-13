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
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/posts/${id}`,
      {
        title,
        description,
        markdown,
        visibility,
      },
      {
        withCredentials: true,
      }
    )
    toast.success('Post edited successfully', { theme: 'dark' })
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || 'Failed to edit post', {
      theme: 'dark',
    })
  }
}

export default editPostHandler
