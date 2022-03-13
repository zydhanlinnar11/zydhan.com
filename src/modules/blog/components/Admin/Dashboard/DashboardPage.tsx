import AdminRoute from '@/modules/blog/components/Admin/AdminRoute'
import Header from '@/components/Header'
import Head from 'next/head'
import Card from '@/common/components/Card'

const Menus = [
  {
    title: 'Manage posts',
    href: '/blog/admin/posts',
    description: 'Manage all posts',
  },
  {
    title: 'View blog',
    href: '/blog',
    description: 'View blog home',
  },
]

const DashboardPage = () => {
  return (
    <AdminRoute>
      <>
        <Head>
          <title>Admin Dashboard - Blog - zydhan.xyz</title>
        </Head>
        <>
          <Header midText="Dashboard" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Menus.map((menu) => (
              <Card {...menu} key={menu.href} />
            ))}
          </div>
        </>
      </>
    </AdminRoute>
  )
}

export default DashboardPage
