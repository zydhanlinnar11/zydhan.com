import AnchorLink from '@/common/components/AnchorLink'
import fetcher from '@/common/utils/AxiosSWRFetcher'
import RecentProject from '@/modules/portfolio/types/RecentProject'
import useSWR from 'swr'
import ListItem from '../elements/ListItem'
import PlaceholderListItem from '../elements/PlaceholderListItem'

const Projects = () => {
  const { data, error } = useSWR<RecentProject[]>(
    '/api/recent-projects',
    fetcher
  )

  return (
    <>
      <ol className="py-4">
        {data &&
          !error &&
          data.map(({ description, name, updated_at, html_url, topics }) => (
            <ListItem
              date={updated_at}
              title={name}
              description={description}
              url={html_url}
              key={name}
              target="_blank"
              labels={topics}
            />
          ))}
        {!data &&
          !error &&
          [1, 2, 3, 4, 5].map((num) => <PlaceholderListItem key={num} />)}
        {error && (
          <p className="text-center">An error occured when fetching data</p>
        )}
      </ol>
      <AnchorLink
        href="https://github.com/zydhanlinnar11?tab=repositories"
        target="_blank"
      >
        View all repositories →
      </AnchorLink>
    </>
  )
}

export default Projects
