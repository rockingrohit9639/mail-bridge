import { isAxiosError } from 'axios'

export function getErrorMessage(
  error: unknown,
  defaultErrorMessage: string = 'Something went wrong. Please try again.',
) {
  let errorMessage: string | undefined
  if (isAxiosError(error)) {
    errorMessage = error.response?.data?.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  }
  return errorMessage ?? defaultErrorMessage
}
