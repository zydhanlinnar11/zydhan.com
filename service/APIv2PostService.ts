import Post from '../model/Post'

interface listResponseModel {
  title: string
  created_at: string
  description: string
  slug: string
  cover_url: string
}

interface singleResponseModel {
  title: string
  created_at: string
  cover_file_name: string
  markdown: string
  user_id: string
}

class APIv2PostService {
  async getListPosts() {
    let posts: Post[] = []
    try {
      const response = await fetch('http://blog-api.zydhan.xyz/api/posts')
      const json: listResponseModel[] = await response.json()
      if (!response.ok) throw new Error('Error')
      json.forEach((post) => {
        posts.push(
          new Post(post.title, post.created_at, '', {
            description: post.description,
            slug: post.slug,
            coverUrl: post.cover_url,
          })
        )
      })
    } catch (error) {
      console.error(error)
      console.error(
        'APIv2PostService.getListPosts(): Unable to fetch data from API'
      )
    }
    return posts
  }

  async getPost(slug: string, callback: (post: Post | undefined) => void) {
    try {
      const response = await fetch(`/api/post/${slug}`)
      if (!response.ok) throw new Error('Error')
      const post: singleResponseModel = await response.json()
      callback(
        new Post(post.title, post.created_at, post.cover_file_name, {
          author: post.user_id,
          markdown: post.markdown,
        })
      )
    } catch (error) {
      callback(undefined)
      console.error('APIv2PostService.getPost(): Unable to fetch data from API')
    }
  }
}

export default APIv2PostService
