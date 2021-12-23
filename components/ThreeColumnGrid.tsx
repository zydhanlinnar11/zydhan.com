import { FC } from 'react'

const ThreeColumnGrid: FC = ({ children }) => {
  return (
    <div className='text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-12 mb-14'>
      {children}
    </div>
  )
}

export default ThreeColumnGrid
