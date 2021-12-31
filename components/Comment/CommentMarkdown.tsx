import AnchorLink from '@blog-components/AnchorLink'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
const MarkdownSyntaxHighlighter = dynamic(
  () => import('@blog-components/Markdown/MarkdownSyntaxHighlighter')
)

interface CommentMarkdownProps {
  markdown: string
}

const CommentMarkdown = ({ markdown }: CommentMarkdownProps) => {
  return (
    <ReactMarkdown
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
          <AnchorLink href={props.href}>{children}</AnchorLink>
        ),
        ul: ({ children }) => (
          <ul className='list-disc list-inside pl-4 mb-4'>{children}</ul>
        ),
        ol: ({ children }) => (
          <ul className='list-decimal list-inside mb-4'>{children}</ul>
        ),
        img: ({ node, children, ...props }) => (
          <span className='w-full h-36 sm:h-56 flex items-center'>
            <img
              src={props.src}
              alt={props.alt}
              className='mx-auto my-2 max-h-full max-w-full'
              loading='lazy'
            />
          </span>
        ),
        h1: ({ children }) => (
          <h1 className='border-b border-b-white/[0.24] mt-6 mb-4 text-2xl pb-2 font-medium'>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className='border-b border-b-white/[0.24] mt-6 mb-4 text-xl pb-2 font-medium'>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className='text-lg font-medium mt-6 mb-4'>{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className='text font-medium mt-6 mb-4'>{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className='text-sm font-medium mt-6 mb-4'>{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className='text-sm text-white/50 font-medium mt-6 mb-4'>
            {children}
          </h6>
        ),
        p: ({ children }) => <p className='mb-4 mt-0'>{children}</p>,
      }}
    >
      {markdown ?? 'Content not available'}
    </ReactMarkdown>
  )
}

export default CommentMarkdown
