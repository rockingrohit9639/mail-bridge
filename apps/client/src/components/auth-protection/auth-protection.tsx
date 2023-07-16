import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '~/hooks/use-auth'

type AuthProtectionProps = {
  children: React.ReactElement
}

export default function AuthProtection({ children }: AuthProtectionProps) {
  const location = useLocation()
  const { user } = useAuthContext()

  if (user) {
    return children
  }

  return <Navigate to={{ pathname: '/', search: `redirectTo=${location.pathname}` }} />
}
