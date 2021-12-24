import React from 'react'

interface CenteredErrorMessageProps {
  header: string
  message: string
}

export default function CenteredErrorMessage({
  header,
  message,
}: CenteredErrorMessageProps) {
  return (
    <div className='my-auto text-center'>
      <h1 className='text-4xl'>{header}</h1>
      <p className='mt-3 text-gray-400'>{message}</p>
    </div>
  )
}
