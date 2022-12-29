import { AuthorizationError } from '@/oauth/types/AuthorizationError'

const useAuthorizationErrorPage = (error?: AuthorizationError) => {
  if (!error) return null

  const { data } = error
  if (data.action === 'redirect') {
    window.open(data.location, '_self')
    return null
  }

  const { error: err_code, error_description } = data.payload

  return (
    <div>
      <p>
        {err_code}: {error_description}
      </p>
    </div>
  )
}

export default useAuthorizationErrorPage
