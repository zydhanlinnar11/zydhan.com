import fetcher from '@/common/utils/AxiosSWRFetcher'
import RecentProject from '@/modules/portfolio/types/RecentProject'
import useSWR from 'swr'
import ListItem from '../elements/ListItem'

const Projects = () => {
  const { data, error } = useSWR<RecentProject[]>(
    '/api/recent-projects',
    fetcher
  )

  return (
    <>
      <h2 className="text-2xl font-medium">Recent Projects</h2>
      <ol className="py-4">
        {data &&
          !error &&
          data.map(({ description, name, updated_at, html_url }) => (
            <ListItem
              date={updated_at}
              title={name}
              description={description}
              url={html_url}
              key={name}
            />
          ))}
      </ol>
    </>
  )
}

export default Projects
