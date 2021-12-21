import BlogConfig from '../../../config/BlogConfig'
import Post from '../../../interfaces/Post'
import { getCookie } from '../../../providers/AuthProvider'
import IPostService, {
  EditSinglePostInterface,
} from '../../interface/IPostService'

interface MultiResponseType {
  title: string
  slug: string
  created_at: string
  description: string
  cover_url: string
}

interface SingleResponseType {
  title: string
  slug: string
  created_at: string
  markdown: string
  cover_file_name: string
  user_id: string
  description: string
}

class PostService implements IPostService {
  async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = []
    try {
      const response = await fetch(`${BlogConfig.BLOG_API}/posts`)
      const json: MultiResponseType[] = await response.json()
      json.forEach((post) => {
        posts.push({
          title: post.title,
          slug: post.slug,
          createdAt: post.created_at,
          description: post.description,
          coverUrl: post.cover_url,
        })
      })
    } catch {
      throw 'API Error'
    }
    return posts
  }

  async getSinglePost(slug: string): Promise<Post> {
    try {
      const response = await fetch(`${BlogConfig.BLOG_API}/post/${slug}`)

      if (response.status !== 200) throw 'Error'

      const json: SingleResponseType = await response.json()
      const post: Post = {
        title: json.title,
        createdAt: json.created_at,
        coverUrl: json.cover_file_name,
        markdown: json.markdown,
        userId: json.user_id,
        slug: slug,
        description: json.description,
      }
      return post
    } catch {
      throw 'API Error'
    }
  }

  async editSinglePost(
    slug: string,
    submissionBody
  ): Promise<EditSinglePostInterface> {
    try {
      const csrf = await fetch(`${BlogConfig.BLOG_API}/sanctum/csrf-cookie`, {
        credentials: 'include',
      })
      const response = await fetch(`${BlogConfig.BLOG_API}/post/${slug}`, {
        method: 'PATCH',
        body: JSON.stringify(submissionBody),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          credentials: 'include',
        },
      })
      const json: { message: string; new_slug?: string } = await response.json()
      if (response.status !== 200)
        return { success: false, message: json.message }
      return { success: true, newSlug: json.new_slug }
    } catch (error) {
      return { success: false, message: 'Connection error.' }
    }
  }

  async addSinglePost(submissionBody): Promise<string | null> {
    try {
      const csrf = await fetch(`${BlogConfig.BLOG_API}/sanctum/csrf-cookie`, {
        credentials: 'include',
      })
      const response = await fetch(`${BlogConfig.BLOG_API}/posts`, {
        method: 'POST',
        body: JSON.stringify(submissionBody),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          credentials: 'include',
        },
      })
      const { slug } = await response.json()

      if (response.status !== 201) return null
      return slug
    } catch (error) {
      return null
    }
  }

  async deleteSinglePost(slug: string): Promise<boolean> {
    try {
      const csrf = await fetch(`${BlogConfig.BLOG_API}/sanctum/csrf-cookie`, {
        credentials: 'include',
      })
      const response = await fetch(`${BlogConfig.BLOG_API}/post/${slug}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          credentials: 'include',
        },
      })
      if (response.status !== 200) return false
      return true
    } catch (error) {
      return false
    }
  }
}

export default PostService
