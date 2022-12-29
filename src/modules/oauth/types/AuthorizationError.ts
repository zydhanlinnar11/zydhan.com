export type AuthorizationError = {
  status: 'error'
  data:
    | {
        action: 'display'
        payload: {
          error_description: string
          error: string
        }
      }
    | {
        action: 'redirect'
        location: string
      }
}
