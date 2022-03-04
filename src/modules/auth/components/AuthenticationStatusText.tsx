type Props = {
  successMessage?: string
  errorMessage?: string
}

const AuthenticationStatusText = ({ errorMessage, successMessage }: Props) => {
  return (
    <div className='mt-1'>
      <small className='text-green-500'>{successMessage}</small>
      <small className='text-red-500'>{errorMessage}</small>
    </div>
  )
}

export default AuthenticationStatusText
