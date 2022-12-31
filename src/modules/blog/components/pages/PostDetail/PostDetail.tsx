import { FC, PropsWithChildren } from 'react'

type Props = {
  meta: any
}

const PostDetail: FC<PropsWithChildren<Props>> = ({ meta, children }) => {
  return <div>{children}</div>
}

export default PostDetail
