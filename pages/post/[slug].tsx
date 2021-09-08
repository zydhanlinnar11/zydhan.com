import { NextPage } from 'next'
import NavbarLayout from '../../components/navbar/NavbarLayout'
import APIv2PostService from '../../service/APIv2PostService'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Post from '../../model/Post'
import TitleBox from '../../components/TitleBox'
import blogConfig from '../../utilities/config'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactMarkdown from 'react-markdown'
import styles from '../../styles/Post.module.css'
import APIv2UserService from '../../service/APIv2UserService'
import User from '../../model/User'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface Params {
  slug: string
}

interface Props {
  post: Post
  author: User
}

interface GetStaticPropsObjType {
  params: Params
}

const PostPage: NextPage<Props> = ({ post, author }) => {
  return (
    <div>
      <Head>
        <title>{post.title} - Zydhan&apos;s Blog</title>
        <meta name='description' content='Welcome to my blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarLayout></NavbarLayout>
      <div className='content'>
        <TitleBox
          title={post?.title}
          backgroundURL={
            post?.postOptionalAttributes?.coverUrl ||
            blogConfig.getTitleBoxDefaultBackground()
          }
        />
        <div className={styles['post-content-container']}>
          <div className={styles['post-content']}>
            <h3 className={styles['post-content-title']}>{post.title}</h3>
            <p className={styles['post-content-info']}>
              <span className={styles['not-highlighted']}>Created by</span>{' '}
              {author.name}{' '}
              <span className={styles['not-highlighted']}>on</span>{' '}
              {post.dateISOFormatString}
            </p>
            <hr />
            <ReactMarkdown
              children={
                post.postOptionalAttributes?.markdown || 'Content not available'
              }
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={materialOceanic}
                      language={match[1]}
                      showLineNumbers
                      {...props}
                      lineNumberContainerStyle={{ paddingLeft: '0em' }}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export async function getStaticProps({ params }: GetStaticPropsObjType) {
  const { slug } = params
  const post = await new APIv2PostService().getPost(slug)
  const author = await new APIv2UserService().getUser(
    post?.postOptionalAttributes?.author || ''
  )
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      author: JSON.parse(JSON.stringify(author)),
    },
  }
}

export async function getStaticPaths() {
  const posts = await new APIv2PostService().getListPosts()
  const paths = posts.map((post) => ({
    params: { slug: post.postOptionalAttributes?.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default PostPage
