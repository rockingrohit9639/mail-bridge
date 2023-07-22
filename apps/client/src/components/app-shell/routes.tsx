import {
  AiOutlineClockCircle,
  AiOutlineDashboard,
  AiOutlineDatabase,
  AiOutlineFile,
  AiOutlineKey,
} from 'react-icons/ai'
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
    id: 'responses',
    name: 'Responses',
    icon: <AiOutlineDatabase />,
    path: '/responses',
    patterns: ['/responses'],
  },
  {
    id: 'schedule-mail',
    name: 'Scheduled Mails',
    icon: <AiOutlineClockCircle />,
    path: '/scheduled-mails',
    patterns: ['/scheduled-mails'],
  },
  {
    id: 'docs',
    name: 'Docs',
    icon: <AiOutlineFile />,
    path: '/docs',
    patterns: ['/docs'],
  },
]
