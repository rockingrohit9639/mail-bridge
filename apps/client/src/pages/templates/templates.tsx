import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Result, Spin, Table } from 'antd'
import { AiOutlineCheck } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Page from '~/components/page'
import { fetchTemplates } from '~/queries/template'
import { getErrorMessage } from '~/utils/error'

export default function Templates() {
  const navigate = useNavigate()
  const templates = useQuery(['templates'], fetchTemplates)

  if (templates.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin>Loading Templates....</Spin>
      </div>
    )
  }

  if (templates.error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Result status="error" title="Something went wrong" subTitle={getErrorMessage(templates.error)} />
      </div>
    )
  }

  if (!templates.data) {
    return null
  }

  return (
    <Page className="space-y-4">
      <Page.Header title="Templates" description="Templates will be used as the content of your emails." />
      <div className="flex items-center justify-end">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            navigate('/create-template')
          }}
        >
          Create Template
        </Button>
      </div>

      <Table
        pagination={false}
        bordered
        dataSource={templates.data}
        columns={[
          { dataIndex: '', title: 'S.No.', render: (_, __, index) => index + 1, width: 50 },
          { dataIndex: 'name', title: 'Template Name' },
          { dataIndex: 'subject', title: 'Subject' },
          {
            dataIndex: 'isDefault',
            title: 'Default',
            render: (isDefault) => (isDefault ? <AiOutlineCheck className="w-6 h-6 text-green-500" /> : null),
          },
          {
            dataIndex: 'id',
            title: 'Actions',
            render: (id) => (
              <div className="flex items-center gap-2">
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => {
                    navigate(`/template/${id}`)
                  }}
                />
              </div>
            ),
          },
        ]}
      />
    </Page>
  )
}
