import { AiOutlineDashboard, AiOutlineKey } from 'react-icons/ai'
import { HiDocument, HiOutlineTemplate } from 'react-icons/hi'

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
    id: 'docs',
    name: 'Docs',
    icon: <HiDocument />,
    path: '/docs',
    patterns: ['/docs'],
  },
]
