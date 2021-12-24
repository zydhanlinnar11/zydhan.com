import Link from 'next/link'
import React from 'react'

interface AnchorLinkProps {
  href: string
  text: string
}

export default function AnchorLink({ href, text }: AnchorLinkProps) {
  return (
    <Link href={href}>
      <a className='text-blue-400 hover:underline visited:text-indigo-500'>
        {text}
      </a>
    </Link>
  )
}
