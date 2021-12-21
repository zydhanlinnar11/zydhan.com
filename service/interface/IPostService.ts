import Post from '../../interfaces/Post'

export interface EditSinglePostInterface {
  success: boolean
  message?: string
  newSlug?: string
}

interface IPostService {
  getAllPosts(): Promise<Post[]>
  getSinglePost(slug: string): Promise<Post>
  editSinglePost(slug: string, submissionBody): Promise<EditSinglePostInterface>
  addSinglePost(submissionBody): Promise<string | null>
  deleteSinglePost(slug: string): Promise<boolean>
}

export default IPostService
