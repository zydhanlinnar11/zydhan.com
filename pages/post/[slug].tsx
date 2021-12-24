import BlogConfig from '../../config/BlogConfig'
import Header from '../../components/Header'
import PostMarkdownContent from '../../components/PostMarkdownContent'
import HeadTemplate from '../../components/HeadTemplate'
import DateTool from '../../utilities/DateTool'
import Post from '../../models/Post'

export default function PostPage({
  post: { title, slug, createdAt, description, markdown },
}: {
  post: Post
}) {
  return (
    <div>
      <HeadTemplate
        title={title}
        description={description ?? BlogConfig.BLOG_DESC}
        url={`${BlogConfig.BLOG_DOMAIN}/post/${slug}`}
      ></HeadTemplate>
      <article>
        <Header
          topText={DateTool.format(createdAt)}
          midText={title}
          bottomText={description ?? BlogConfig.BLOG_DESC}
        />
        <div className='text-center mx-auto'>
          <div className='bg-white/[0.24] h-px w-full'></div>
          <PostMarkdownContent markdown={markdown}></PostMarkdownContent>
        </div>
      </article>
    </div>
  )
}

export async function getStaticProps({ params: { slug } }) {
  let post: Post | null

  try {
    post = await BlogConfig.POST_SERVICE.getSinglePost(slug)
  } catch {
    post = null
  }

  return { props: { post } }
}

export async function getStaticPaths() {
  let posts: Post[]
  try {
    posts = await BlogConfig.POST_SERVICE.getAllPosts()
  } catch {
    posts = []
  }

  let paths = []
  posts.forEach(({ slug }) => {
    paths.push({ params: { slug } })
  })

  return {
    paths,
    fallback: false,
  }
}
