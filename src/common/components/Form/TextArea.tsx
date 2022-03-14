import { forwardRef, InputHTMLAttributes } from 'react'

const TextArea = forwardRef<
  HTMLTextAreaElement,
  InputHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const { className } = props

  return (
    <textarea
      {...props}
      ref={ref}
      className={`block focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full px-4 py-2 rounded-md bg-transparent border border-black/30 dark:border-white/[0.24] ${className}`}
    />
  )
})

TextArea.displayName = 'TextArea'

export default TextArea
