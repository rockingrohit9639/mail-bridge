import { Result, Table } from 'antd'
import { useQuery } from 'react-query'
import Page from '~/components/page'
import { getEmails } from '~/queries/email'
import { getErrorMessage } from '~/utils/error'
import EmailData from './components/email-data'

export default function Emails() {
  const { data, isLoading, error } = useQuery(['emails'], getEmails)

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <Result status="error" title="Something went wrong" subTitle={getErrorMessage(error)} />
      </div>
    )
  }

  return (
    <Page className="space-y-4">
      <Page.Header title="Responses" description="The responses which you have received from your forms." />

      <div className="space-y-2">
        <div className="text-xl font-bold">Total Responses ({data?.length})</div>
        <Table
          pagination={false}
          bordered
          loading={isLoading}
          dataSource={data}
          columns={[
            {
              dataIndex: 'id',
              title: 'S.No.',
              render: (_, __, index) => index + 1,
            },
            {
              dataIndex: 'to',
              title: 'To',
              width: 350,
            },
            {
              dataIndex: 'data',
              title: 'Data',
              render: (data) => <EmailData data={data} />,
            },
          ]}
        />
      </div>
    </Page>
  )
}
