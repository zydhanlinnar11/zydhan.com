import NarrowPageContainer from '@/common/components/elements/NarrowPageContainer'
import SpinnerLoading from '@/common/components/elements/SpinnerLoading'
import { useUserState } from '@/common/providers/UserProvider'
import Router from 'next/router'
import { FC } from 'react'

const PrivateRoute: FC = ({ children }) => {
  const userState = useUserState()

  if (userState.state !== 'authenticated') {
    if (userState.state === 'unauthenticated') {
      Router.push(`/auth/login?next=${Router.pathname}`)
    }
    return (
      <NarrowPageContainer>
        <div className='my-auto'>
          <SpinnerLoading />
        </div>
      </NarrowPageContainer>
    )
  }

  return <>{children}</>
}

export default PrivateRoute
