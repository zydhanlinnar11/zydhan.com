import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import CenteredErrorMessage from './CenteredErrorMessage'
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
      <Head>
        <title>
          {title} - {BlogConfig.BLOG_TITLE}
        </title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
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
