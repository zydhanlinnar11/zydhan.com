import Post from '../../models/Post'

interface IPostService {
  getAllPosts(): Promise<Post[]>
  getSinglePost(slug: string): Promise<Post>
}

export default IPostService
