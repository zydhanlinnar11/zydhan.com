import Post from '../../../models/Post'
import { getCookie } from '../../../providers/AuthProvider'
import IPostService, {
  EditSinglePostInterface,
} from '../../interface/IPostService'

class PostService implements IPostService {
  async getAllPosts(passCredential?: boolean): Promise<Post[]> {
    interface Response {
      id: string
      title: string
      slug: string
      created_at: string
      updated_at: string
      cover_url: string
      user_id: string
      markdown: string
      description: string
      visibility: '1' | '2' | '3'
    }

    try {
      const posts: Post[] = []
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/posts`,
        {
          headers: {
            Authorization: `Bearer ${
              passCredential && localStorage.getItem('token')
            }`,
          },
        }
      )

      if (!response.ok) throw new Error(response.statusText)

      const json: Response[] = await response.json()
      json.forEach(
        ({
          title,
          slug,
          created_at,
          cover_url,
          id,
          markdown,
          description,
          user_id,
          updated_at,
          visibility,
        }) => {
          posts.push({
            title,
            slug,
            createdAt: created_at,
            coverUrl: cover_url,
            updatedAt: updated_at,
            id,
            markdown,
            description,
            userId: user_id,
            visibility,
          })
        }
      )

      return posts
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async getSinglePost(slug: string, passCredential?: boolean): Promise<Post> {
    interface Response {
      title: string
      slug: string
      created_at: string
      markdown: string
      cover_url: string
      user_id: string
      description: string
      id: string
      updated_at: string
      visibility: '1' | '2' | '3'
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/posts/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${
              passCredential && localStorage.getItem('token')
            }`,
          },
        }
      )

      const {
        title,
        created_at,
        cover_url,
        markdown,
        user_id,
        description,
        id,
        updated_at,
        visibility,
      }: Response = await response.json()

      if (response.status === 500) throw new Error('INTERNAL_SERVER_ERROR')
      if (response.status === 404) throw new Error('NOT_FOUND_ERROR')

      const post: Post = {
        title: title,
        createdAt: created_at,
        updatedAt: updated_at,
        coverUrl: cover_url,
        markdown: markdown,
        userId: user_id,
        slug: slug,
        description: description,
        id,
        visibility,
      }

      return post
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async editSinglePost(slug: string, submissionBody): Promise<string> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/posts/${slug}`,
        {
          method: 'PATCH',
          body: JSON.stringify(submissionBody),
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

      return (await response.json()).slug
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async addSinglePost(submissionBody): Promise<string | null> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/posts`,
        {
          method: 'POST',
          body: JSON.stringify(submissionBody),
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
      if (response.status === 422) throw new Error('UNPROCESSABLE_ERROR')
      if (response.status === 403) throw new Error('FORBIDDEN_ERROR')
      if (response.status === 401) throw new Error('UNAUTHORIZED_ERROR')

      return (await response.json()).slug
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async deleteSinglePost(slug: string): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/posts/${slug}`,
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
}

export default PostService
