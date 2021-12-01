import Post from '../../models/Post'

interface IPostService {
  getAllPosts(): Promise<Post[]>
  getSinglePost(slug: string): Promise<Post>
  editSinglePost(slug: string, submissionBody)
  addSinglePost(submissionBody)
}

export default IPostService
