import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import HomePost from '../types/HomePost'

type Props = {
  post: HomePost
  href: string
}

const PostCard: FC<Props> = ({ post, href }) => {
  return (
    <Link href={href}>
      <a
        key={post.slug}
        className="bg-white dark:bg-transparent group h-72 rounded-xl max-w-xs w-full mx-auto shadow-md dark:shadow-none hover:scale-105 duration-300 dark:border dark:border-white/30 overflow-hidden"
      >
        <article className="h-full flex flex-col">
          <div className="h-32 block w-full relative">
            <Image
              src={post.cover}
              placeholder="blur"
              alt={`${post.slug}-image`}
              layout="fill"
              objectFit="cover"
              sizes="320px"
            />
          </div>
          <div className="text-left p-6 flex flex-col justify-between flex-auto">
            <div>
              <h3 className="font-bold text-lg">{post.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
              {post.created_at}
            </p>
          </div>
        </article>
      </a>
    </Link>
  )
}

export default PostCard
