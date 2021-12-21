import Head from 'next/head'
import BlogConfig from '../../config/BlogConfig'
import styles from '../../styles/PostPage.module.css'
import Header from '../../components/Header'
import PostMarkdownContent from '../../components/PostMarkdownContent'

interface Post {
  title: string
  slug: string
  createdAt: string
  description?: string
  userId?: string
  markdown?: string
}

export default function PostPage({ post }: { post: Post }) {
  return (
    <div>
      <Head>
        <title>
          {post.title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta
          name='description'
          content={post.description ?? BlogConfig.BLOG_DESC}
        />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={post.title} />
        <meta
          property='og:url'
          content={`${BlogConfig.BLOG_DOMAIN}/post/${post.slug}`}
        />
        <meta
          property='og:description'
          content={post.description ?? BlogConfig.BLOG_DESC}
        />
      </Head>
      <article>
        <Header
          topText={new Date(post.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          midText={post.title}
          bottomText={post.description ?? BlogConfig.BLOG_DESC}
        />
        <div className='text-center mx-auto'>
          <div className='bg-white/[0.24] h-px w-full'></div>
          <div className='py-4 text-left' id={styles.postContent}>
            <PostMarkdownContent markdown={post.markdown}></PostMarkdownContent>
          </div>
        </div>
      </article>
    </div>
  )
}

export async function getStaticProps({ params }) {
  interface Response {
    title: string
    slug: string
    created_at: string
    markdown: string
    cover_file_name: string
    user_id: string
    description: string
  }

  const slug = params.slug
  const nullPostProps = {
    props: {
      post: null,
    },
  }

  try {
    const response = await fetch(`${BlogConfig.BLOG_API}/post/${slug}`)

    if (response.status !== 200) return nullPostProps

    const { title, created_at, markdown, user_id, description }: Response =
      await response.json()
    const post: Post = {
      title: title,
      createdAt: created_at,
      markdown: markdown,
      userId: user_id,
      slug: slug,
      description: description,
    }
    return {
      props: {
        post,
      },
    }
  } catch {
    return nullPostProps
  }
}

export async function getStaticPaths() {
  interface Response {
    slug: string
  }

  const paths = []
  try {
    const response = await fetch(`${BlogConfig.BLOG_API}/posts`)
    const json: Response[] = await response.json()
    json.forEach(({ slug }) => {
      paths.push({ params: { slug: slug } })
    })
  } catch {
    return {
      paths: [],
      fallback: false,
    }
  }

  return {
    paths,
    fallback: false,
  }
}
