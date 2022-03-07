import Header from '@/common/components/Header'
import React from 'react'

export default function Custom403() {
  return (
    <div className='my-auto'>
      <Header
        midText='403 - Forbidden'
        bottomText='Anda tidak berhak akses halaman ini'
      ></Header>
    </div>
  )
}
