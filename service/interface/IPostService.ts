import { ISubmissionBody } from '../../components/Forms/AddEditPost'
import Post from '../../models/Post'

interface IPostService {
  getAllPosts(): Promise<Post[]>
  getSinglePost(slug: string): Promise<Post>
  editSinglePost(slug: string, submissionBody): Promise<string>
  addSinglePost(submissionBody): Promise<string>
}

export default IPostService
