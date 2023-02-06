import { userRepository } from '../providers/dependencies'

export class UpdatePersonalInfoRequest {
  public name: string
  public email: string
  public email: string

  constructor(
    private userId: string,
    name?: string | string[],
    email?: string | string[]
  ) {
    // TODO: buat class sendiri buat validation error
    if (
      typeof name !== 'string' ||
      name.trim().length > 255 ||
      name.trim().length === 0
    )
      throw new Error('validation_error')
    // TODO: validasi email
    if (
      typeof email !== 'string' ||
      email.trim().length > 255 ||
      email.trim().length === 0 ||
      userRepository.isAnotherUserIdWithSameEmailExists(email)
    ) {
    }
  }
}
