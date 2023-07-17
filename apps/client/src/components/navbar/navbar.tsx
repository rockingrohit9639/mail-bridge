import { Button } from 'antd'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useAuthContext } from '~/hooks/use-auth'

type NavbarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Navbar({ className, style }: NavbarProps) {
  const { user, logout } = useAuthContext()

  return (
    <div
      className={clsx('backdrop-blur-lg w-full fixed top-0 left-0 h-16 bg-white/50 shadow-sm', className)}
      style={style}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full px-4 lg:px-0">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 select-none h-8 rounded text-primary border border-primary">
            @
          </div>
          <Link to="/" className="text-primary font-bold text-2xl">
            Mail Bridge
          </Link>
        </div>
        <div className="flex items-center uppercase divide-x-2 gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="px-4 transition-all delay-75 hover:text-primary">
                Dashboard
              </Link>
              <Link to="/api-keys" className="px-4 transition-all delay-75 hover:text-primary">
                API Keys
              </Link>
              <Link to="/templates" className="px-4 transition-all delay-75 hover:text-primary">
                Templates
              </Link>
            </>
          ) : null}

          <Link to="/docs" className="px-4 transition-all delay-75 hover:text-primary">
            Docs
          </Link>

          <Link to="/about-us" className="px-4 transition-all delay-75 hover:text-primary">
            About Us
          </Link>
        </div>

        {user ? (
          <Button className="text-primary" onClick={logout}>
            Logout
          </Button>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/signup">Signup</Link>
            <Link to="/login" className="text-white bg-primary rounded-full px-4 py-2">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
