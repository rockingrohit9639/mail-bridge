import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClientProvider } from 'react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './app.tsx'
import './styles/index.css'
import { ANTD_THEME } from './styles/theme.ts'
import { queryClient } from './utils/client.ts'
import { AuthProvider } from './hooks/use-auth.ts'
import { ENV } from './utils/env.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ConfigProvider theme={ANTD_THEME}>
            <GoogleOAuthProvider clientId={ENV.VITE_GOOGLE_CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
          </ConfigProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
