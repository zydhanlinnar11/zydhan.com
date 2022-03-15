import { axiosAPI } from '@/common/utils/AxiosInstance'
import Post from '@/modules/portfolio/types/Post'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import AnchorLink from '../../../../common/components/AnchorLink'

const fetcher = (url: string) => axiosAPI.get(url).then((res) => res.data)

const LatestPost = () => {
  const { data, error } = useSWR<Post[]>('/blog/posts', fetcher)

  return (
    <>
      <Head>
        <title>Zydhan Linnar Putra - Full-stack Developer</title>
      </Head>
      <h2 className="text-2xl font-medium mt-4">Recent Projects</h2>
      <ul className="py-4">
        {data &&
          !error &&
          data.map(({ description, created_at, title, slug }) => (
            <li key={slug}>
              <Link href={`/blog/posts/${slug}`}>
                <a className="relative flex justify-between py-6 after:content-[''] after:h-px after:w-full after:block after:absolute after:top-full dark:after:bg-white/[0.24] hover:scale-[1.02] duration-150">
                  <div className="flex flex-col gap-y-3">
                    <p className="text-xl">{title}</p>
                    <p className="dark:text-gray-300">
                      {description || 'No description available.'}
                    </p>
                  </div>
                  <p>{created_at}</p>
                </a>
              </Link>
            </li>
          ))}
      </ul>
      <AnchorLink href="/blog">Read all posts →</AnchorLink>
    </>
  )
}

export default LatestPost
