import constate from 'constate'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { message } from 'antd'
import { useCallback } from 'react'
import useError from './use-error'
import { fetchLoggedInUser, login } from '~/queries/auth'
import { ENV } from '~/utils/env'

export function useAuth() {
  const { getErrorMessage } = useError()
  const queryClient = useQueryClient()

  const {
    isLoading: authVerificationInProgress,
    data: user,
    remove: removeUserData,
    refetch: refetchUserData,
  } = useQuery(['logged-in'], fetchLoggedInUser, {
    retry: false,
  })

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      message.success('Successfully logged in')
      // save the token in localStorage for further usage
      window.localStorage.setItem(ENV.VITE_BEARER_TOKEN_KEY, data.accessToken)

      // update the user in the queryClient, so that you would automatically get user from useAuthContext
      queryClient.setQueryData(['logged-in'], data.user)
    },
    onError: (error) => {
      message.error(getErrorMessage(error))
    },
  })

  const logout = useCallback(() => {
    window.localStorage.removeItem(ENV.VITE_BEARER_TOKEN_KEY)
    removeUserData()
    refetchUserData()
  }, [removeUserData, refetchUserData])

  return {
    authVerificationInProgress,
    user,
    loginMutation,
    logout,
  }
}

export const [AuthProvider, useAuthContext] = constate(useAuth)
