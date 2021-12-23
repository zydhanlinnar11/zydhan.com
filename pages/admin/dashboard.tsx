import Link from 'next/link'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from '../../providers/AuthProvider'
import AdminPageWrapper from '../../components/AdminPageWrapper'
import Header from '../../components/Header'
import ThreeColumnGrid from '../../components/ThreeColumnGrid'

const dashboardItems = [
  { title: 'Manage posts', link: '/admin/posts', icon: faNewspaper },
]

export default function AdminDashboardPage() {
  const title = 'Admin Dashboard'
  const { user } = useAuth()
  return (
    <AdminPageWrapper title={title}>
      <>
        <Header
          midText={title}
          bottomText={`Welcome, ${user ? user.name : 'admin'}!`}
        />
        <ThreeColumnGrid>
          {dashboardItems.map((item) => (
            <Link href={item.link} key={item.title}>
              <a className='h-40 rounded-lg max-w-xs w-full mx-auto flex p-8 border border-white/[0.24]'>
                <div className='my-auto flex flex-col gap-4'>
                  <FontAwesomeIcon icon={item.icon} size='3x'></FontAwesomeIcon>
                  <p className='font-bold text-lg'>{item.title}</p>
                </div>
              </a>
            </Link>
          ))}
        </ThreeColumnGrid>
      </>
    </AdminPageWrapper>
  )
}
