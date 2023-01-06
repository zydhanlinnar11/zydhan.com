export type ValidationErrorResponse = {
  errors: { [key: string]: string[] }
  message: string
}

export const emptyValidationError: ValidationErrorResponse = {
  errors: {},
  message: '',
}
