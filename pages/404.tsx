import CenteredErrorMessage from '../components/CenteredErrorMessage'
import HeadTemplate from '../components/HeadTemplate'
import React from 'react'

export default function Custom404() {
  return (
    <div className='my-auto'>
      <HeadTemplate title='Not Found'></HeadTemplate>
      <CenteredErrorMessage
        header='404 Not Found'
        message='Halaman yang anda cari tidak ditemukan.'
      ></CenteredErrorMessage>
    </div>
  )
}
