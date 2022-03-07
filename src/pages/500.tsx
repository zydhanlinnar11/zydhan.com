import Header from '@/common/components/Header'
import React from 'react'

export default function Custom500() {
  return (
    <div className='my-auto'>
      <Header
        midText='500 - Internal Server Error'
        bottomText='Maaf atas ketidaknyamanannya, silahkan coba lagi nanti.'
      ></Header>
    </div>
  )
}
