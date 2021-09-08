import type { NextPage } from 'next'
import Head from 'next/head'
import NavbarLayout from '../components/navbar/NavbarLayout'
import APIv2PostService from '../service/APIv2PostService'
import Post from '../model/Post'
import blogConfig from '../utilities/config'
import PostItem from '../components/post/PostItem'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer'
import TitleBox from '../components/TitleBox'
import NotAvailable from '../components/NotAvailable'

interface PropsType {
  posts: Post[]
}

export async function getStaticProps() {
  const posts = await new APIv2PostService().getListPosts()

  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  }
}

const Home: NextPage<PropsType> = ({ posts }) => {
  let content
  if (posts.length == 0)
    content = (
      <main>
        <NotAvailable text='No content available.' />
      </main>
    )
  else
    content = (
      <main className={styles.listContent}>
        {posts.map((post) => (
          <a
            style={{ textDecoration: 'none' }}
            href={post.URL}
            key={post.postOptionalAttributes?.slug || ''}
          >
            <PostItem
              title={post.title}
              localDate={post.dateISOFormatString}
              description={
                post.postOptionalAttributes?.description || 'No description'
              }
              thumbnailURL={
                post.postOptionalAttributes?.coverUrl ||
                blogConfig.getTitleBoxDefaultBackground()
              }
            />
          </a>
        ))}
      </main>
    )

  return (
    <div>
      <Head>
        <title>Zydhan's Blog</title>
        <meta name='description' content='Welcome to my blog' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavbarLayout></NavbarLayout>
      <div className='content'>
        <TitleBox
          title={blogConfig.getBlogName()}
          backgroundURL={blogConfig.getTitleBoxDefaultBackground()}
        />
        {content}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
