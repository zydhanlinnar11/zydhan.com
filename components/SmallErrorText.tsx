import React from 'react'

const SmallErrorText: React.FC = ({ children }) => {
  return <small className='text-red-500'>{children}</small>
}

export default SmallErrorText
