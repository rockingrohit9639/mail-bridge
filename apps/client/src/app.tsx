import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Signup = lazy(() => import('~/pages/signup'))

function App() {
  return (
    <Routes>
      <Route element={<Signup />} path="signup" />
    </Routes>
  )
}

export default App
