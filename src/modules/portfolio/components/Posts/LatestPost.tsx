import AnchorLink from '@/common/components/AnchorLink'
import HomePosts from '@/modules/blog/data/HomePosts'
import ListItem from '../elements/ListItem'

const posts = HomePosts

const LatestPost = () => {
  return (
    <>
      <ul className="py-4">
        {posts.map(({ description, created_at, title, slug }) => (
          <ListItem
            date={new Date(created_at).toLocaleDateString('id-ID', {
              timeZone: 'Asia/Jakarta',
            })}
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
