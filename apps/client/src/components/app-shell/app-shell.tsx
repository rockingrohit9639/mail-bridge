import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Avatar, Dropdown } from 'antd'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { useUser } from '~/hooks/use-user'
import { useAuthContext } from '~/hooks/use-auth'

type AppShellProps = {
  children: React.ReactElement
}

const BASIC_LINK_CLASS_NAME =
  'px-4 py-2 rounded border border-transparent hover:border-primary hover:text-primary transition-all delay-75'

export default function AppShell({ children }: AppShellProps) {
  const { logout } = useAuthContext()
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen">
      {/* Navbar */}
      <div className="bg-white shadow">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4">
          <div className="text-xl font-medium">Mail Bridge</div>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  clsx(BASIC_LINK_CLASS_NAME, isActive && 'bg-primary text-white hover:text-white')
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  clsx(BASIC_LINK_CLASS_NAME, isActive && 'bg-primary text-white hover:text-white')
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  clsx(BASIC_LINK_CLASS_NAME, isActive && 'bg-primary text-white hover:text-white')
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <Dropdown
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: 'profile',
                      label: 'Profile',
                      icon: <AiOutlineUser />,
                      onClick: () => {
                        navigate(`/profile/${user.id}`)
                      },
                    },
                    {
                      key: 'logout',
                      label: 'Logout',
                      onClick: logout,
                      icon: <AiOutlineLogout />,
                    },
                  ],
                }}
              >
                <Avatar className="cursor-pointer">{user.name[0]}</Avatar>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  )
}
