import Post from '../../../models/Post'
import PostListItem from '../../../models/PostListItem'
import { getCookie } from '../../../providers/AuthProvider'
import IPostService, {
  EditSinglePostInterface,
} from '../../interface/IPostService'

class PostService implements IPostService {
  // Description
  async getAllPosts(): Promise<PostListItem[]> {
    interface Response {
      title: string
      slug: string
      created_at: string
      cover_url: string
    }

    try {
      const posts: PostListItem[] = []
      const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API}/posts`)

      if (!response.ok) throw new Error(response.statusText)

      const json: Response[] = await response.json()
      json.forEach(({ title, slug, created_at, cover_url }) => {
        posts.push({
          title,
          slug,
          createdAt: created_at,
          coverUrl: cover_url,
        })
      })

      return posts
    } catch (e) {
      if (e === undefined) throw new Error('CONN_ERROR')
      throw e
    }
  }

  async getSinglePost(slug: string): Promise<Post> {
    interface Response {
      title: string
      slug: string
      created_at: string
      markdown: string
      cover_file_name: string
      user_id: string
      description: string
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_API}/post/${slug}`
    )

    const {
      title,
      created_at,
      cover_file_name,
      markdown,
      user_id,
      description,
    }: Response = await response.json()
    const post: Post = {
      title: title,
      createdAt: created_at,
      coverUrl: cover_file_name,
      markdown: markdown,
      userId: user_id,
      slug: slug,
      description: description,
    }

    return post
  }

  async editSinglePost(
    slug: string,
    submissionBody
  ): Promise<EditSinglePostInterface> {
    try {
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/sanctum/csrf-cookie`,
        {
          credentials: 'include',
        }
      )
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/post/${slug}`,
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
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/sanctum/csrf-cookie`,
        {
          credentials: 'include',
        }
      )
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
      const { slug } = await response.json()

      if (response.status !== 201) return null
      return slug
    } catch (error) {
      return null
    }
  }

  async deleteSinglePost(slug: string): Promise<boolean> {
    try {
      const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/sanctum/csrf-cookie`,
        {
          credentials: 'include',
        }
      )
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BLOG_API}/post/${slug}`,
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
      if (response.status !== 200) return false
      return true
    } catch (error) {
      return false
    }
  }
}

export default PostService
