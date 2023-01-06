import { ComponentType, FC, PropsWithChildren } from 'react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import { User } from '@/common/types/User'
import withPrivateRoute from '@/common/hooks/withPrivateRoute'
import { useRouter } from 'next/router'

const withAdminRoute = <P,>(Component: ComponentType<P & { user: User }>) => {
  const ComponentWithProps = withPrivateRoute((props: P & { user: User }) => (
    <AdminRoute user={props.user}>
      <Component {...props} />
    </AdminRoute>
  ))

  return ComponentWithProps
}

type Props = { user: User }

const AdminRoute: FC<PropsWithChildren<Props>> = ({ children, user }) => {
  const { replace } = useRouter()

  if (!user.admin) {
    replace('/404')
    return <LoadingPage />
  }

  return <>{children}</>
}

export default withAdminRoute
