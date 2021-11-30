import BlogConfig from '../../../config/BlogConfig'
import Post from '../../../models/Post'
import IPostService from '../../interface/IPostService'

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
}

export default PostService
