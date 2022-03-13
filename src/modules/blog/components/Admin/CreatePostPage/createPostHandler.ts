import axios, { AxiosResponse } from 'axios'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'

const createPostHandler = async (
  visibility: number,
  router: NextRouter,
  title?: string,
  description?: string,
  markdown?: string
) => {
  try {
    const res = await axios.post<any, AxiosResponse<{ id: string }, any>>(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/admin/posts`,
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
    toast.success('Post created successfully', { theme: 'dark' })
    await router.push(`/blog/admin/posts/${res.data.id}`)
  } catch (e) {
    if (!axios.isAxiosError(e)) throw e
    toast.error(e.response?.data?.message || 'Failed to create post', {
      theme: 'dark',
    })
  }
}

export default createPostHandler
