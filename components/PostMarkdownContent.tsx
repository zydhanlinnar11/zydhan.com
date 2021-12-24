import ReactMarkdown from 'react-markdown'
import { materialOceanic } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import React from 'react'

interface PostMarkdownContentProps {
  markdown: string
}

export default function PostMarkdownContent({
  markdown,
}: PostMarkdownContentProps) {
  return (
    <div className='text-left pb-2 px-2 max-w-full break-all'>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ node, inline, className, children, ...props }) => {
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
          a: ({ node, children, ...props }) => (
            <a
              className='text-blue-400 hover:underline visited:text-indigo-500'
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className='list-disc list-inside pl-4 mb-4'>{children}</ul>
          ),
          ol: ({ children }) => (
            <ul className='list-decimal list-inside mb-4'>{children}</ul>
          ),
          img: ({ node, children, ...props }) => (
            <div className='max-w-xl h-56 sm:max-w-4xl sm:h-96 mx-auto relative'>
              <Image
                src={props.src}
                alt={props.alt}
                className='mx-auto my-2'
                layout='fill'
                objectFit='contain'
                sizes='896px'
              />
            </div>
          ),
          h1: ({ children }) => (
            <h1 className='border-b border-b-white/[0.24] mt-6 mb-4 text-3xl pb-2 font-medium'>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className='border-b border-b-white/[0.24] mt-6 mb-4 text-2xl pb-2 font-medium'>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className='text-xl font-medium mt-6 mb-4'>{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className='font-medium mt-6 mb-4'>{children}</h4>
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
    </div>
  )
}
