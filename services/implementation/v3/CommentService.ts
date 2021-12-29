import BlogConfig from '@blog-config/BlogConfig'
import Comment from '@blog-models/Comment'
import { getCookie } from '@blog-providers/AuthProvider'
import ICommentService from '@blog-services/interface/ICommentService'

interface Response {
  id: string
  user_id: string
  user_name: string
  user_avatar: string
  post_id: string
  content: string
  created_at: string
  updated_at: string
}

function responseJsonToComment(json: Response) {
  const comment: Comment = {
    id: json.id,
    postId: json.post_id,
    userId: json.user_id,
    userAvatarUrl: json.user_avatar,
    userName: json.user_name,
    content: json.content,
    createdAt: json.created_at,
    updatedAt: json.updated_at,
  }
  return comment
}

export default class CommentService implements ICommentService {
  async getAllCommentsByPostSlug(slug: string): Promise<Comment[]> {
    try {
      const response = await fetch(
        `${BlogConfig.BLOG_API}/posts/${slug}/comments`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) return []

      const json: Response[] = await response.json()
      const comments: Comment[] = []

      json.forEach((json) => comments.push(responseJsonToComment(json)))
      return comments
    } catch (e) {
      return []
    }
  }

  async addComment(slug: string, content: string): Promise<Comment> {
    try {
      const response = await fetch(
        `${BlogConfig.BLOG_API}/posts/${slug}/comments`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ content }),
          method: 'POST',
        }
      )
      if (response.status === 500) throw new Error('INTERNAL_SERVER_ERROR')
      if (response.status === 422) throw new Error('UNPROCESSABLE_ERROR')
      if (response.status === 403) throw new Error('FORBIDDEN_ERROR')
      if (response.status === 401) throw new Error('UNAUTHORIZED_ERROR')

      const json: Response = await response.json()
      const comment: Comment = responseJsonToComment(json)

      return comment
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async deleteComment(id: string): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/comments/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            credentials: 'include',
          },
        }
      )

      if (response.status === 500) throw new Error('INTERNAL_SERVER_ERROR')
      if (response.status === 404) throw new Error('NOT_FOUND_ERROR')
      if (response.status === 403) throw new Error('FORBIDDEN_ERROR')
      if (response.status === 401) throw new Error('UNAUTHORIZED_ERROR')
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async editComment(id: string, content: string): Promise<Comment> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/comments/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ content }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            credentials: 'include',
          },
        }
      )

      if (response.status === 500) throw new Error('INTERNAL_SERVER_ERROR')
      if (response.status === 404) throw new Error('NOT_FOUND_ERROR')
      if (response.status === 422) throw new Error('UNPROCESSABLE_ERROR')
      if (response.status === 403) throw new Error('FORBIDDEN_ERROR')
      if (response.status === 401) throw new Error('UNAUTHORIZED_ERROR')

      return responseJsonToComment(await response.json())
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }
}
