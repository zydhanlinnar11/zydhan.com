import AdminPageWrapper from '../../../components/AdminPageWrapper'
import AddEditPostForm from '../../../components/Forms/AddEditPost'

export default function CreatePostPage() {
  const pageTitle = 'Create Post'

  return (
    <AdminPageWrapper title={pageTitle}>
      <header className='flex flex-col min-h-24 my-16 text-center mx-auto'>
        <h1 className='text-4xl font-bold'>{pageTitle}</h1>
      </header>
      <AddEditPostForm post={null} />
    </AdminPageWrapper>
  )
}
