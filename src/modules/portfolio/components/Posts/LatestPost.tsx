import AnchorLink from '@/common/components/AnchorLink'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import Post from '@/modules/portfolio/types/Post'
import Link from 'next/link'
import useSWR from 'swr'
import ListItem from '../elements/ListItem'

const fetcher = (url: string) => axiosAPI.get(url).then((res) => res.data)

const LatestPost = () => {
  const { data, error } = useSWR<Post[]>('/blog/posts', fetcher)

  return (
    <>
      <h2 className="text-2xl font-medium mt-4">Recent Projects</h2>
      <ul className="py-4">
        {data &&
          !error &&
          data.map(({ description, created_at, title, slug }) => (
            <ListItem
              date={created_at}
              title={title}
              description={description}
              url={`/blog/posts/${slug}`}
              key={slug}
            />
          ))}
      </ul>
      <AnchorLink href="/blog">Read all posts →</AnchorLink>
    </>
  )
}

export default LatestPost
