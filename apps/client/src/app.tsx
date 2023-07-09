import { Suspense, lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import AuthProtection from './components/auth-protection'
import AppShell from './components/app-shell'

const Signup = lazy(() => import('~/pages/signup'))
const Login = lazy(() => import('~/pages/login'))
const Dashboard = lazy(() => import('~/pages/dashboard'))
const ApiKeys = lazy(() => import('~/pages/api-keys'))
const Templates = lazy(() => import('~/pages/templates'))

function App() {
  return (
    <Routes>
      <Route
        element={
          <Suspense
            fallback={
              <div className="flex h-screen w-full items-center justify-center">
                <Spin>Login please wait.</Spin>
              </div>
            }
          >
            <AuthProtection>
              <AppShell>
                <Outlet />
              </AppShell>
            </AuthProtection>
          </Suspense>
        }
      >
        <Route element={<Dashboard />} path="/" />
        <Route element={<ApiKeys />} path="/api-keys" />
        <Route element={<Templates />} path="/templates" />
      </Route>

      <Route element={<Signup />} path="signup" />
      <Route element={<Login />} path="login" />
    </Routes>
  )
}

export default App
