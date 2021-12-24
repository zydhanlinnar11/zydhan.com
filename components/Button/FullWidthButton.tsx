import React from 'react'

interface FullWidthButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'reset' | 'submit'
  disabled?: any
}

export default function FullWidthButton(props: FullWidthButtonProps) {
  return (
    <button
      {...props}
      className='rounded-md border-2 border-opacity-50 border-gray-600 w-full h-10 mt-3 hover:bg-blue-600 hover:bg-opacity-30 transition-colors duration-100 focus:bg-blue-900 focus:bg-opacity-30 disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed'
    >
      {props.children}
    </button>
  )
}
