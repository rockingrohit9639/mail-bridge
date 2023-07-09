import axios, { AxiosRequestHeaders } from 'axios'
import { QueryClient } from 'react-query'
import { ENV } from './env'

export const apiClient = axios.create({
  baseURL: ENV.VITE_API_BASE_URL,
})

apiClient.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }

  const accessToken = localStorage.getItem(ENV.VITE_BEARER_TOKEN_KEY)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
