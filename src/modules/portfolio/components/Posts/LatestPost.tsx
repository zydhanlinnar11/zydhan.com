import AnchorLink from '@/common/components/AnchorLink'
import { axiosAPI } from '@/common/utils/AxiosInstance'
import Post from '@/modules/portfolio/types/Post'
import useSWR from 'swr'
import ListItem from '../elements/ListItem'
import PlaceholderListItem from '../elements/PlaceholderListItem'

const fetcher = (url: string) => axiosAPI.get(url).then((res) => res.data)

const LatestPost = () => {
  const { data, error } = useSWR<Post[]>('/blog/posts/portfolio', fetcher)

  return (
    <>
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
        {!data && !error && <PlaceholderListItem />}
        {error && (
          <p className="text-center">An error occured when fetching data</p>
        )}
      </ul>
      <AnchorLink href="/blog">Read all posts →</AnchorLink>
    </>
  )
}

export default LatestPost
