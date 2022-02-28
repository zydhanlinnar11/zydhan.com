import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import materialOceanic from 'react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import c from 'react-syntax-highlighter/dist/cjs/languages/prism/c'
import cpp from 'react-syntax-highlighter/dist/cjs/languages/prism/cpp'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php'
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python'
import sql from 'react-syntax-highlighter/dist/cjs/languages/prism/sql'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'

type Props = {
  language: string
}

SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('c', c)
SyntaxHighlighter.registerLanguage('cpp', cpp)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('php', php)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('typescript', typescript)

const MarkdownSyntaxHighlighter: React.FC<Props> = ({ language, children }) => {
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
