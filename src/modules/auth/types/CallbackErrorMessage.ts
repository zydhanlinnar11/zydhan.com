export type CallbackErrorMessage =
  | 'already_linked_to_another_user'
  | 'user_with_same_email_exist'

export function isCallbackErrorMessage(
  message?: string
): message is CallbackErrorMessage {
  switch (message) {
    case 'already_linked_to_another_user':
    case 'user_with_same_email_exist':
      return true
    default:
      return false
  }
}
