import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  title: string
  description?: string | null
  date: string
  url: string
  target?: React.HTMLAttributeAnchorTarget
}

const ListItem: FC<Props> = ({
  date,
  title,
  url,
  description,
  target = '_self',
}) => {
  return (
    <li>
      <Link href={url}>
        <a
          target={target}
          className="relative flex flex-col gap-y-5 md:flex-row md:gap-x-12 justify-between py-6 after:content-[''] after:h-px after:w-full after:block after:absolute after:top-full dark:after:bg-white/[0.24] hover:scale-[1.02] duration-150"
        >
          <div className="flex flex-col gap-y-3">
            <p className="text-xl font-medium">{title}</p>
            <p className="dark:text-gray-300">
              {description || 'No description available.'}
            </p>
          </div>
          <p className="md:min-w-fit">{date}</p>
        </a>
      </Link>
    </li>
  )
}

export default ListItem
