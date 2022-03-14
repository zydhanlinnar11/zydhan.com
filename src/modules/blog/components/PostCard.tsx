import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Post } from './PostListPage'

type Props = {
  post: Post
  href: string
}

const PostCard: FC<Props> = ({ post, href }) => {
  return (
    <Link href={href}>
      <a
        key={post.slug}
        className="group h-72 rounded-xl max-w-xs w-full mx-auto border border-white/20 hover:border-white/50 duration-500"
      >
        <article className="h-full flex flex-col">
          <div
            className="h-32 block w-full relative rounded-t-xl overflow-hidden
  after:content-[''] after:inline-block after:h-full after:w-full after:group-hover:bg-black/20 after:transition after:duration-500 after:ease-in-out"
          >
            <Image
              src={post.cover_url}
              alt={`${post.slug}-image`}
              className="group-hover:scale-110 transition duration-500 ease-in-out rounded-t-xl -z-10"
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
