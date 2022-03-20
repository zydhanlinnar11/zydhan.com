type Comment = {
  id: string
  user_name: string
  user_avatar_url: string | null
  comment: string
  createdAt: string
  is_own_comment: boolean
}

export default Comment
