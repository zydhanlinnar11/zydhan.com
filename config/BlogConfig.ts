import CommentService from '@blog-services/implementation/v3/CommentService'
import PostService from '@blog-services/implementation/v3/PostService'
import ICommentService from '@blog-services/interface/ICommentService'
import IPostService from '@blog-services/interface/IPostService'

const BLOG_TITLE = "Zydhan's Blog"
const BLOG_DESC = 'Welcome to my blog. Have fun here!'
const BLOG_DOMAIN = process.env.NEXT_PUBLIC_BLOG_DOMAIN
const BLOG_API = process.env.NEXT_PUBLIC_BLOG_API
const POST_SERVICE: IPostService = new PostService()
const COMMENT_SERVICE: ICommentService = new CommentService()

const BlogConfig = {
  BLOG_TITLE,
  BLOG_DESC,
  BLOG_DOMAIN,
  BLOG_API,
  POST_SERVICE,
  COMMENT_SERVICE,
}

export default BlogConfig
