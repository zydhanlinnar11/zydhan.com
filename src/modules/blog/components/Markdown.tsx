import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import AnchorLink from '@/common/components/AnchorLink'
import rehypeSlug from 'rehype-slug'

const MarkdownSyntaxHighlighter = dynamic(
  () => import('@/modules/blog/components/MarkdownSyntaxHighlighter')
)

type Props = {
  markdown: string
  allowHTML?: boolean
  slugifyHeading?: boolean
}

const Markdown: FC<Props> = ({ markdown, allowHTML = false }) => {
  return (
    <div className="text-left max-w-full break-words">
      <ReactMarkdown
        rehypePlugins={allowHTML ? [rehypeRaw, rehypeSlug] : [rehypeSlug]}
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
                  className +
                  ' py-1 px-2 m-0 text-sm rounded bg-gray-300 dark:bg-gray-700'
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
                  placeholder="blur"
                />
              </span>
            )
          },
          h1: ({ children, ...props }) => (
            <h1
              id={props.id}
              className="border-b border-b-black/[0.24] dark:border-b-white/[0.24] mt-6 mb-4 text-3xl pb-2 font-medium scroll-mt-16"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              id={props.id}
              className="border-b border-b-black/[0.24] dark:border-b-white/[0.24] mt-6 mb-4 text-2xl pb-2 font-medium scroll-mt-16"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              id={props.id}
              className="text-xl font-medium mt-6 mb-4 scroll-mt-16"
            >
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 id={props.id} className="font-medium mt-6 mb-4 scroll-mt-16">
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5
              id={props.id}
              className="text-sm font-medium mt-6 mb-4 scroll-mt-16"
            >
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6
              id={props.id}
              className="text-sm text-white/50 font-medium mt-6 mb-4 scroll-mt-16"
            >
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
