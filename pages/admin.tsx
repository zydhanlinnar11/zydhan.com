import Router from 'next/router'
import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    Router.push('/admin/dashboard')
  }, [])

  return <></>
}
