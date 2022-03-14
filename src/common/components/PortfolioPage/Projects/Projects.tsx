import fetcher from '@/common/utils/AxiosSWRFetcher'
import RecentProject from '@/modules/portfolio/types/RecentProject'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR from 'swr'

const Projects = () => {
  const { data, error } = useSWR<RecentProject[]>(
    '/api/recent-projects',
    fetcher
  )

  //   useEffect(() => console.log(data), [data])

  return (
    <>
      <h2 className="text-2xl font-medium">Recent Projects</h2>
      <ol className="py-4">
        {data &&
          !error &&
          data.map(({ description, name, updated_at, html_url }) => (
            <li key={name}>
              <Link href={html_url}>
                <a
                  target="_blank"
                  className="relative flex justify-between py-6 after:content-[''] after:h-px after:w-full after:block after:absolute after:top-full dark:after:bg-white/[0.24] hover:scale-[1.02] duration-150"
                >
                  <div className="flex flex-col gap-y-3">
                    <p className="text-xl">{name}</p>
                    <p className="dark:text-gray-300">
                      {description || 'No description available.'}
                    </p>
                  </div>
                  <p>{updated_at}</p>
                </a>
              </Link>
            </li>
          ))}
      </ol>
    </>
  )
}

export default Projects
