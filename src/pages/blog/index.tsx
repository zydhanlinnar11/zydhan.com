import { useRouter } from 'next/router'
import { useEffect } from 'react'

const BlogIndex = () => {
  const { isReady, replace } = useRouter()

  useEffect(() => {
    replace('/blog/posts')
  }, [isReady, replace])

  return <></>
}

export default BlogIndex
