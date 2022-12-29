import { backendFetcher } from '@/common/hooks/useAxios'
import useAuthorization from '@/oauth/hooks/useAuthorization'
import useAuthorizationErrorPage from '@/oauth/hooks/useAuthorizationErrorPage'
import withAuthorizationRoute from '@/oauth/hooks/withAuthorizationRoute'
import { AuthorizationError } from '@/oauth/types/AuthorizationError'
import { AuthorizationSuccess } from '@/oauth/types/AuthorizationSuccess'
import axios from 'axios'
import { FormEventHandler, memo } from 'react'

const AuthorizationPage = () => {
  const { data, error, isLoading } = useAuthorization()
  const errorPage = useAuthorizationErrorPage(error?.response?.data)

  if (errorPage) return errorPage
  if (!data) return <p>Loading</p>
  if ('location' in data) {
    window.open(data.location, '_self')
    return <></>
  }

  const { auth_token, client_id, client_name, scopes, state } = data

  const authorize: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const body = { auth_token, client_id, state }
    backendFetcher
      .post<AuthorizationSuccess>('/oauth/authorize', body)
      .then((response) => {
        window.open(response.data.location, '_self')
      })
  }

  const deny: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    backendFetcher
      .delete(
        `/oauth/authorize?auth_token=${auth_token}&client_id=${client_id}&state=${state}`
      )
      .catch((error) => {
        if (!axios.isAxiosError<AuthorizationError>(error))
          throw new Error('invalid_response')
        const data = error.response?.data.data
        if (data?.action !== 'redirect') throw new Error('invalid_response')
        window.open(data.location, '_self')
      })
  }

  return (
    <div>
      <p>
        <strong>{client_name}</strong> is requesting permission to access your
        account.
      </p>

      {scopes.length > 0 ? (
        <div>
          <p>
            <strong>This application will be able to:</strong>
          </p>

          <ul>
            {scopes.map(({ description, id }) => (
              <li key={id}>{description}</li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      <div>
        <form onSubmit={authorize}>
          <button type="submit">Authorize</button>
        </form>
        <form onSubmit={deny}>
          <button type="submit">Deny</button>
        </form>
      </div>
    </div>
  )
}

export default withAuthorizationRoute(memo(AuthorizationPage))
