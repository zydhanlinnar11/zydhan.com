import CenteredErrorMessage from '@blog-components/CenteredErrorMessage'
import HeadTemplate from '@blog-components/HeadTemplate'

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
