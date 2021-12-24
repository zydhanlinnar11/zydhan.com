import Router from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../providers/AuthProvider'
import CenteredErrorMessage from './CenteredErrorMessage'
import HeadTemplate from './HeadTemplate'
import SpinnerLoading from './SpinnerLoading'

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
