import ReactMarkdown from 'react-markdown'
import { FC } from 'react'
import rehypeHighlight from 'rehype-highlight'

type Props = {
  markdown: string
}

const Markdown: FC<Props> = ({ markdown }) => {
  return (
    <div className="break-words prose dark:prose-invert max-w-full">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown ?? 'Content not available'}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
