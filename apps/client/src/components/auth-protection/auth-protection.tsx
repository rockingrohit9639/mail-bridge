import { Spin } from 'antd'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '~/hooks/use-auth'

type AuthProtectionProps = {
  children: React.ReactElement
}

export default function AuthProtection({ children }: AuthProtectionProps) {
  const location = useLocation()
  const { user, authVerificationInProgress } = useAuthContext()

  if (authVerificationInProgress) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin>Authenticating User...</Spin>
      </div>
    )
  }

  if (user) {
    return children
  }

  return <Navigate to={{ pathname: '/', search: `redirectTo=${location.pathname}` }} />
}
