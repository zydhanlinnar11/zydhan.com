interface Post {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  coverUrl: string
  description: string
  userId: string
  markdown: string
  id: string
  visibility: '1' | '2' | '3'
}

export default Post
