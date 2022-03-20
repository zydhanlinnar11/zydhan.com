import AnchorLink from '@/common/components/AnchorLink'
import RecentProject from '@/modules/portfolio/types/RecentProject'
import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'
import ListItem from '../elements/ListItem'
import PlaceholderListItem from '../elements/PlaceholderListItem'

const fetcher = (url: string) =>
  axios
    .get<any, AxiosResponse<RecentProject[], any>, any>(url)
    .then((res) => res.data)

const Projects = () => {
  const { data, error } = useSWR<RecentProject[]>(
    'https://api.github.com/users/zydhanlinnar11/repos?sort=updated&per_page=5',
    fetcher
  )

  return (
    <>
      <ol className="py-4">
        {data &&
          !error &&
          data.map(({ description, name, updated_at, html_url, topics }) => (
            <ListItem
              date={new Date(updated_at).toLocaleDateString('id-ID', {
                timeZone: 'Asia/Jakarta',
              })}
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
