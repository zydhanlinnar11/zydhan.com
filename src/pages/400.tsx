import Header from '@/common/components/Header'
import React from 'react'

export default function Custom400() {
  return (
    <div className="my-auto">
      <Header
        midText="400 - Bad Request"
        bottomText="Sorry, but system doesn't know what do you want"
      ></Header>
    </div>
  )
}
