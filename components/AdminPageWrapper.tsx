import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import BlogConfig from '../config/BlogConfig'
import { useAuth } from '../providers/AuthProvider'
import SpinnerLoading from './SpinnerLoading'
import Custom403 from './Custom403'

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
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      {isUserFetched ? (
        user?.admin ? (
          children
        ) : (
          <Custom403 />
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
