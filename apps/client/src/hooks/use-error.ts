import { useCallback } from 'react'
import { isAxiosError } from 'axios'
import { message } from 'antd'

const useError = () => {
  const isUnAuthorized = useCallback((error: any) => {
    let isUserUnAuthorized = false

    if (isAxiosError(error)) {
      if (+error.response?.data?.statusCode === 401) {
        isUserUnAuthorized = true
      } else if (+error.request?.statusCode === 401) {
        isUserUnAuthorized = true
      }
    } else if (error && error.code && +error.code === 401) {
      isUserUnAuthorized = true
    }
    return isUserUnAuthorized
  }, [])

  const getErrorMessage = useCallback((error: any, defaultErrorMessage = 'Something went wrong. Please try again') => {
    let errorMessage: string | undefined
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message
    } else if (error.message) {
      errorMessage = error.message
    }
    return errorMessage ?? defaultErrorMessage
  }, [])

  const handleError = useCallback(
    (error: any) => {
      message.error(getErrorMessage(error))
    },
    [getErrorMessage],
  )

  return { isUnAuthorized, getErrorMessage, handleError }
}

export default useError
