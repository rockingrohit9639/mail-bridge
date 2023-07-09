import { Avatar, Divider, Dropdown, Tooltip } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { cloneElement, useState } from 'react'
import { AiOutlineLeft, AiOutlineLogout, AiOutlineRight, AiOutlineUser } from 'react-icons/ai'
import clsx from 'clsx'
import { ROUTES } from './routes'
import { useAuthContext } from '~/hooks/use-auth'

type AppShellProps = {
  children: React.ReactElement
}

const SIDEBAR_WIDTH = 250
const SIDEBAR_COLLAPSED_WIDTH = 100

export default function AppShell({ children }: AppShellProps) {
  const [collapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const { logout, user } = useAuthContext()

  return (
    <div className="w-full min-h-screen grid grid-cols-12">
      <div
        className={collapsed ? 'col-span-1' : 'col-span-2'}
        style={{ width: collapsed ? AppShell.SIDEBAR_COLLAPSED_WIDTH : AppShell.SIDEBAR_WIDTH }}
      >
        <div
          className="fixed top-0 left-0 bottom-0 bg-white shadow overflow-y-auto flex justify-between flex-col transition-all delay-0 ease-in-out overflow-hidden"
          style={{ width: collapsed ? AppShell.SIDEBAR_COLLAPSED_WIDTH : AppShell.SIDEBAR_WIDTH }}
        >
          <div className="space-y-4 p-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary border-primary border rounded shadow">
                @
              </div>
              {collapsed ? null : <div className="text-2xl font-bold text-primary">Mail Bridge</div>}
            </div>
            <Divider />
            <ul className="space-y-2">
              {ROUTES.map((route) => (
                <Tooltip key={route.id} title={route.name} placement="right" destroyTooltipOnHide>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-2 border-2 px-4 py-2 rounded-lg border-transparent hover:border-primary hover:text-primary transition-all delay-75 ease-in',
                        isActive && 'bg-primary text-white hover:text-white',
                      )
                    }
                  >
                    <div className={collapsed ? 'w-full' : undefined}>
                      {cloneElement(route.icon, { className: collapsed ? 'w-full h-6' : 'w-6 h-6' })}
                    </div>
                    {!collapsed ? <div>{route.name}</div> : null}
                  </NavLink>
                </Tooltip>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="p-4">
              <Dropdown
                placement="top"
                trigger={['click']}
                menu={{
                  items: [
                    {
                      key: 'profile',
                      label: 'Profile',
                      icon: <AiOutlineUser />,
                      onClick: () => {
                        navigate(`/profile/${user?.id}`)
                      },
                    },
                    {
                      key: 'logout',
                      label: 'Logout',
                      icon: <AiOutlineLogout />,
                      onClick: logout,
                    },
                  ],
                }}
              >
                <div
                  className={clsx(
                    'flex items-center gap-2 border-2 p-2 rounded-lg cursor-pointer',
                    collapsed && 'justify-center',
                  )}
                >
                  <Avatar>{user?.name[0]}</Avatar>
                  {!collapsed ? <div className="text-lg">{user?.name}</div> : null}
                </div>
              </Dropdown>
            </div>

            <div
              className="flex items-center justify-center p-4 border-t bg-gray-100 cursor-pointer"
              onClick={() => {
                setIsCollapsed((prev) => !prev)
              }}
            >
              {collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
            </div>
          </div>
        </div>
      </div>
      <div className={clsx('px-8 py-4', collapsed ? 'col-span-11' : 'col-span-10 ')}>{children}</div>
    </div>
  )
}

AppShell.SIDEBAR_WIDTH = SIDEBAR_WIDTH
AppShell.SIDEBAR_COLLAPSED_WIDTH = SIDEBAR_COLLAPSED_WIDTH
