import Header from '@blog-components/Header'
import HeadTemplate from '@blog-components/HeadTemplate'
import PostMarkdownContent from '@blog-components/PostMarkdownContent'
import BlogConfig from '@blog-config/BlogConfig'
import Post from '@blog-models/Post'
import { GetStaticPaths, GetStaticProps } from 'next'
import DateTool from 'utilities/DateTool'

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

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  let post: Post | null

  try {
    post = await BlogConfig.POST_SERVICE.getSinglePost(
      slug as unknown as string
    )
  } catch (e) {
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = async () => {
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
    fallback: 'blocking',
  }
}
