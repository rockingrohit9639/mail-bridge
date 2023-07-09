import { Divider } from 'antd'
import { AiOutlineKey, AiOutlineMail } from 'react-icons/ai'
import Page from '~/components/page'

export default function Dashboard() {
  return (
    <Page className="space-y-4">
      <div className="bg-white px-4 py-2 rounded shadow">
        <div className="text-2xl font-bold">Dashboard</div>
        <div className="text-primary">Analytics</div>
      </div>
      <Divider />

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white w-full h-full p-4 rounded shadow space-y-2">
          <div className="flex items-center gap-2">
            <AiOutlineMail className="w-6 h-6 text-blue-500" />
            <div className="text-lg">Total Email Sent</div>
          </div>
          <div className="text-2xl font-bold">5</div>
        </div>

        <div className="bg-white w-full h-full p-4 rounded shadow space-y-2">
          <div className="flex items-center gap-2">
            <AiOutlineKey className="w-6 h-6 text-yellow-500" />
            <div className="text-lg">Total API Keys</div>
          </div>
          <div className="text-2xl font-bold">2</div>
        </div>
      </div>
    </Page>
  )
}
