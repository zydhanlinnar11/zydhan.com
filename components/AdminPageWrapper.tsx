import { useAuth } from '@blog-providers/AuthProvider'
import Router from 'next/router'
import { useEffect } from 'react'
import CenteredErrorMessage from '@blog-components/CenteredErrorMessage'
import HeadTemplate from '@blog-components/HeadTemplate'
import SpinnerLoading from '@blog-components/SpinnerLoading'

interface AdminPageWrapperProps {
  title: string
}

const AdminPageWrapper: React.FC<AdminPageWrapperProps> = ({
  title,
  children,
}) => {
  const { isUserFetched, user } = useAuth()
  useEffect(() => {
    if (isUserFetched && !user) {
      Router.replace('/login')
      return
    }
  }, [isUserFetched, user])

  return (
    <>
      <HeadTemplate title={title}></HeadTemplate>
      {isUserFetched ? (
        user?.admin ? (
          children
        ) : (
          <CenteredErrorMessage
            header='403 Forbidden'
            message="Sorry, but you don't have access to this page."
          ></CenteredErrorMessage>
        )
      ) : (
        <div className='my-auto'>
          <SpinnerLoading />
        </div>
      )}
    </>
  )
}

export default AdminPageWrapper
