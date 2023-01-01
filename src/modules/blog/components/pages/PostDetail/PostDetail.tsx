import { FC, PropsWithChildren } from 'react'
import { Prose } from '@nikolovlazar/chakra-ui-prose'

const PostDetail: FC<PropsWithChildren> = ({ children }) => {
  return <Prose>{children}</Prose>
}

export default PostDetail
