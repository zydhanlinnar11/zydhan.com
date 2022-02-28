import { FC } from 'react'

const NarrowPageContainer: FC = ({ children }) => {
  return (
    <div className='flex flex-col mx-auto grow w-full max-w-5xl px-6'>
      {children}
    </div>
  )
}

export default NarrowPageContainer
