import Image from 'next/image'
import Link from 'next/link'
import Post from '../models/Post'

interface Props {
  post: Post
  url: string
}

export default function PostCard({ post, url }: Props) {
  return (
    <Link href={url} key={post.slug}>
      <a
        key={post.slug}
        className='h-72 rounded-lg max-w-xs w-full mx-auto'
        style={{ border: '1px solid rgba(255, 255, 255, 0.24)' }}
      >
        <article className='h-full flex flex-col'>
          <div className='h-32 block w-full relative'>
            <Image
              src={post.coverUrl}
              alt={`${post.slug}-image`}
              className='rounded-t-lg'
              layout='fill'
              objectFit='cover'
              priority={true}
              sizes='960px'
            />
          </div>
          <div className='text-left p-6 flex flex-col justify-between flex-auto'>
            <div>
              <h3 className='font-bold text-lg'>{post.title}</h3>
            </div>
            <p className='text-gray-400 font-semibold text-sm'>
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </article>
      </a>
    </Link>
  )
}
