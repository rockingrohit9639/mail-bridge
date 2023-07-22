import { AiOutlineBarChart, AiOutlineClockCircle, AiOutlineKey, AiOutlineMail, AiOutlineTable } from 'react-icons/ai'
import { useQuery } from 'react-query'
import Page from '~/components/page'
import StatCard from '~/components/stat-card'
import { getDashboardStats } from '~/queries/dashboard'

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery('dashboard-stats', getDashboardStats)

  return (
    <Page className="space-y-4">
      <Page.Header title="Dashboard" description="Analytics" />

      <div className="grid grid-cols-4 gap-3">
        <StatCard
          title="Total APIs Created"
          value={stats?.totalApisCreated!}
          icon={<AiOutlineKey className="w-5 h-5 text-blue-500" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Email Sent"
          value={stats?.totalEmailSent!}
          icon={<AiOutlineMail className="w-5 h-5 text-red-500" />}
          isLoading={isLoading}
        />
        <StatCard
          title="API Usage Remaining"
          value={`${stats?.apiUsage.remaining} / ${stats?.apiUsage.total}`}
          icon={<AiOutlineBarChart className="w-5 h-5 text-green-500" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Templates Created"
          value={stats?.totalTemplatesCreated!}
          icon={<AiOutlineTable className="w-5 h-5 text-purple-500" />}
          isLoading={isLoading}
        />
        <StatCard
          title="Total Emails Scheduled"
          value={stats?.totalEmailScheduled!}
          icon={<AiOutlineClockCircle className="w-5 h-5 text-yellow-500" />}
          isLoading={isLoading}
        />
      </div>
    </Page>
  )
}
