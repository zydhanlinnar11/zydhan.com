import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import AnchorLink from '@/common/components/AnchorLink'

const MarkdownSyntaxHighlighter = dynamic(
  () => import('@/modules/blog/components/MarkdownSyntaxHighlighter')
)

type Props = {
  markdown: string
  allowHTML?: boolean
}

const Markdown: FC<Props> = ({ markdown, allowHTML = false }) => {
  return (
    <div className="text-left max-w-full break-words">
      <ReactMarkdown
        rehypePlugins={allowHTML ? [rehypeRaw] : []}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <MarkdownSyntaxHighlighter language={match[1]}>
                {String(children).replace(/\n$/, '')}
              </MarkdownSyntaxHighlighter>
            ) : (
              <code
                className={
                  className + ' py-1 px-2 m-0 text-sm rounded bg-gray-700'
                }
                {...props}
              >
                {children}
              </code>
            )
          },
          a: ({ node, children, ...props }) => (
            <AnchorLink href={props.href ?? '#'} target="_blank">
              {children}
            </AnchorLink>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside pl-4 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ul className="list-decimal list-inside mb-4">{children}</ul>
          ),
          img: ({ node, children, ...props }) => {
            if (!props.src) return <></>
            return (
              <span className="max-w-xl h-56 sm:max-w-4xl sm:h-96 mx-auto relative block">
                <Image
                  src={props.src}
                  alt={props.alt}
                  className="mx-auto my-2"
                  layout="fill"
                  objectFit="contain"
                  sizes="896px"
                  priority={props.loading === 'eager'}
                />
              </span>
            )
          },
          h1: ({ children }) => (
            <h1 className="border-b border-b-white/[0.24] mt-6 mb-4 text-3xl pb-2 font-medium">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="border-b border-b-white/[0.24] mt-6 mb-4 text-2xl pb-2 font-medium">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-6 mb-4">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-medium mt-6 mb-4">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-sm font-medium mt-6 mb-4">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm text-white/50 font-medium mt-6 mb-4">
              {children}
            </h6>
          ),
          p: ({ children }) => <p className="mb-4 mt-0">{children}</p>,
        }}
      >
        {markdown ?? 'Content not available'}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
