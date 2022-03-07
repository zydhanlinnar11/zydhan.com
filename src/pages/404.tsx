import Header from '@/common/components/Header'
import React from 'react'

export default function Custom404() {
  return (
    <div className='my-auto'>
      <Header
        midText='404 - Page Not Found'
        bottomText='Halaman yang anda cari tidak ditemukan.'
      ></Header>
    </div>
  )
}
