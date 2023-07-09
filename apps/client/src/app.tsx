import { Suspense, lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import AuthProtection from './components/auth-protection'
import AppShell from './components/app-shell'

const Signup = lazy(() => import('~/pages/signup'))
const Login = lazy(() => import('~/pages/login'))
const Home = lazy(() => import('~/pages/home'))

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
        <Route element={<Home />} path="/" />
      </Route>

      <Route element={<Signup />} path="signup" />
      <Route element={<Login />} path="login" />
    </Routes>
  )
}

export default App
