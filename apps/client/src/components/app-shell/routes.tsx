import { AiOutlineDashboard, AiOutlineInfoCircle, AiOutlineKey } from 'react-icons/ai'

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
    path: '/',
    patterns: ['/'],
  },
  {
    id: 'about-us',
    name: 'About Us',
    icon: <AiOutlineInfoCircle />,
    path: '/about-us',
    patterns: ['/about-us'],
  },
  {
    id: 'api-keys',
    name: 'API Keys',
    icon: <AiOutlineKey />,
    path: '/api-keys',
    patterns: ['/api-keys'],
  },
]
