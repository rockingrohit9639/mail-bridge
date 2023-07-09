import invariant from 'tiny-invariant'
import { useAuthContext } from './use-auth'

export function useUser() {
  const { user } = useAuthContext()
  invariant(user, 'useUser should only be used inside auth protected pages')
  return { user }
}
