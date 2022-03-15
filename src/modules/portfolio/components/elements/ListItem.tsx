import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  title: string
  description?: string | null
  date: string
  url: string
}

const ListItem: FC<Props> = ({ date, title, url, description }) => {
  return (
    <li>
      <Link href={url}>
        <a className="relative flex justify-between py-6 after:content-[''] after:h-px after:w-full after:block after:absolute after:top-full dark:after:bg-white/[0.24] hover:scale-[1.02] duration-150">
          <div className="flex flex-col gap-y-3">
            <p className="text-xl">{title}</p>
            <p className="dark:text-gray-300">
              {description || 'No description available.'}
            </p>
          </div>
          <p>{date}</p>
        </a>
      </Link>
    </li>
  )
}

export default ListItem
