import { ClockCircleOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Result, Spin } from 'antd'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Page from '~/components/page'
import { getScheduledMails } from '~/queries/schedule-email'
import { DATE_FORMAT } from '~/utils/constants'
import { getErrorMessage } from '~/utils/error'

export default function ScheduledMails() {
  const { data, isLoading, error } = useQuery(['scheduled-emails'], getScheduledMails)
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin>Loading Scheduled Mails</Spin>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Result status="error" title="Something went wrong" subTitle={getErrorMessage(error)} />
      </div>
    )
  }

  if (data?.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Empty description="You have to created any schedule mails yet.">
          <Button
            type="primary"
            icon={<ClockCircleOutlined />}
            onClick={() => {
              navigate('/create-email-schedule')
            }}
          >
            Schedule Mail Now
          </Button>
        </Empty>
      </div>
    )
  }

  return (
    <Page>
      <Page.Header
        title="Scheduled Mails"
        description="The mail which will be delivered on the scheduled time are listed here."
      />

      <div className="flex items-center justify-end mb-4">
        <Button
          type="primary"
          icon={<ClockCircleOutlined />}
          onClick={() => {
            navigate('/create-email-schedule')
          }}
        >
          Schedule Email
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data?.map((mail) => (
          <Card
            key={mail.id}
            title={
              <div>
                <div>{mail.title}</div>
                <div className="text-sm text-gray-500 font-normal">{moment(mail.createdAt).fromNow()}</div>
              </div>
            }
            actions={[
              <div key="edit">
                <EditOutlined />
              </div>,
            ]}
          >
            <div className="space-y-2">
              <div>{mail.description}</div>
              <div className="text-sm text-gray-500 font-normal">Email will be sent to {mail.to.length} people</div>

              <div className="text-sm text-gray-500">
                Scheduled for <span>{moment(mail.scheduledTime).format(DATE_FORMAT + ' HH:mm')}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  )
}
