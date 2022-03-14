import Link from 'next/link'
import React from 'react'

interface AnchorLinkProps {
  href: string
  target?: string
}

const AnchorLink: React.FC<AnchorLinkProps> = ({ href, children, target }) => {
  return (
    <Link href={href}>
      <a
        className="group relative text-blue-600 dark:text-blue-400 visited:text-indigo-500"
        target={target}
      >
        {children}
        <span
          className="h-[2px] absolute bg-blue-600 dark:bg-blue-400 group-visited:bg-indigo-500 w-full bottom-0 left-0
        scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        ></span>
      </a>
    </Link>
  )
}

export default AnchorLink
