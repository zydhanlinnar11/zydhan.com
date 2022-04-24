import { FC, PropsWithChildren } from 'react'

const NarrowPageContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto grow w-full max-w-5xl px-6 py-8">
      {children}
    </div>
  )
}

export default NarrowPageContainer
