import ReactMarkdown from 'react-markdown'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'

interface PostMarkdownContentProps {
  markdown: string
}

export default function PostMarkdownContent({
  markdown,
}: PostMarkdownContentProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={materialOceanic}
              language={match[1]}
              customStyle={{
                borderRadius: '0.375rem',
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {markdown ?? 'Content not available'}
    </ReactMarkdown>
  )
}
