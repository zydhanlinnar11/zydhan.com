import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import PostCard from '../components/PostCard'
import Header from '../components/Header'
import CenteredErrorMessage from '../components/CenteredErrorMessage'
import HeadTemplate from '../components/HeadTemplate'
import ThreeColumnGrid from '../components/ThreeColumnGrid'
import PostListItem from '../models/PostListItem'
import React from 'react'

export default function Home({ posts }: { posts: PostListItem[] }) {
  const { user } = useAuth()

  return (
    <div>
      <HeadTemplate title='Home'></HeadTemplate>
      <Header
        midText={BlogConfig.BLOG_TITLE}
        bottomText={`Welcome, ${user ? user.name : 'guest'}! Have fun here.`}
      />
      {posts?.length > 0 ? (
        <ThreeColumnGrid>
          {posts.map((post) => (
            <PostCard post={post} url={`/post/${post.slug}`} key={post.slug} />
          ))}
        </ThreeColumnGrid>
      ) : (
        <CenteredErrorMessage
          header='No post available'
          message='There are currently no posts, or the server is under maintenance.'
        ></CenteredErrorMessage>
      )}
    </div>
  )
}

export async function getStaticProps() {
  let posts: PostListItem[]
  try {
    posts = await BlogConfig.POST_SERVICE.getAllPosts()
  } catch {
    posts = []
  }

  return { props: { posts } }
}
