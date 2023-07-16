import { AiOutlineDashboard, AiOutlineInfoCircle, AiOutlineKey } from 'react-icons/ai'
import { HiOutlineTemplate } from 'react-icons/hi'

export type AppshellRoute = {
  id: string
  name: string
  icon: React.ReactElement<{ className?: string }>
  path: string
  patterns: string[]
}

export const ROUTES: AppshellRoute[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <AiOutlineDashboard />,
    path: '/dashboard',
    patterns: ['/dashboard'],
  },
  {
    id: 'api-keys',
    name: 'API Keys',
    icon: <AiOutlineKey />,
    path: '/api-keys',
    patterns: ['/api-keys'],
  },
  {
    id: 'templates',
    name: 'Templates',
    icon: <HiOutlineTemplate />,
    path: '/templates',
    patterns: ['/templates'],
  },
  {
    id: 'about-us',
    name: 'About Us',
    icon: <AiOutlineInfoCircle />,
    path: '/about-us',
    patterns: ['/about-us'],
  },
]
