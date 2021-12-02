import PostService from '../service/implementation/v3/PostService'

const BLOG_TITLE = "Zydhan's Blog"
const BLOG_DESC = 'Welcome to my blog. Have fun here!'
const BLOG_DOMAIN = 'https://blog.zydhan.xyz'
const BLOG_API = 'https://api.blog.zydhan.xyz'
const POST_SERVICE = new PostService()
export default { BLOG_TITLE, BLOG_DESC, BLOG_DOMAIN, BLOG_API, POST_SERVICE }
