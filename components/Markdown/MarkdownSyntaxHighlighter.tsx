import React from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import materialOceanic from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic'

interface MarkdownSyntaxHighlighterProps {
  language: string
}

const MarkdownSyntaxHighlighter: React.FC<MarkdownSyntaxHighlighterProps> = ({
  language,
  children,
}) => {
  return (
    <SyntaxHighlighter
      style={materialOceanic}
      language={language}
      customStyle={{
        borderRadius: '0.375rem',
      }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  )
}

export default MarkdownSyntaxHighlighter
