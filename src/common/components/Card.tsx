import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  href: string
  title: string
  description: string
}

const Card: FC<Props> = ({ href, title, description }) => {
  return (
    <Link href={href}>
      <a
        className="hover:text-sky-300 hover:border-sky-300
            focus:text-sky-300 focus:border-sky-300
            active:text-sky-300 active:border-sky-300
             m-4 p-6 text-left text-inherit border border-gray-50 rounded-[10px] transition-colors duration-150"
      >
        <h2 className="m-0 mb-4 text-2xl">{title} &rarr;</h2>
        <p className="m-0 text-xl">{description}</p>
      </a>
    </Link>
  )
}

export default Card
