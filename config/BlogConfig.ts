import PostService from '../service/implementation/v3/PostService'
import IPostService from '../service/interface/IPostService'

const BLOG_TITLE = "Zydhan's Blog"
const BLOG_DESC = 'Welcome to my blog. Have fun here!'
const BLOG_DOMAIN = process.env.NEXT_PUBLIC_BLOG_DOMAIN
const BLOG_API = process.env.NEXT_PUBLIC_BLOG_API
const POST_SERVICE: IPostService = new PostService()

const BlogConfig = {
  BLOG_TITLE,
  BLOG_DESC,
  BLOG_DOMAIN,
  BLOG_API,
  POST_SERVICE,
}

export default BlogConfig
