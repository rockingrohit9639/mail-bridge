import { CopyOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Result, Table, message } from 'antd'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import CreateApiKeyModal from '~/components/create-api-key-modal'
import Page from '~/components/page'
import { fetchApiKeys } from '~/queries/api-key'
import { ApiKey } from '~/types/api-key'
import { getErrorMessage } from '~/utils/error'

export default function ApiKeys() {
  const [visibleKey, setVisibleKey] = useState<ApiKey | undefined>(undefined)
  const apiKeysQ = useQuery(['api-keys'], fetchApiKeys)

  const content = useMemo(() => {
    if (apiKeysQ.error) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Result status="error" title="Something went wrong" subTitle={getErrorMessage(apiKeysQ.error)} />
        </div>
      )
    }

    if (!apiKeysQ.data) {
      return null
    }

    if (apiKeysQ.data.length === 0) {
      return <Empty description="You don't have any API key yet." />
    }

    return (
      <Table
        loading={apiKeysQ.isLoading}
        bordered
        dataSource={apiKeysQ.data}
        columns={[
          {
            dataIndex: 'id',
            title: 'S.No.',
            render: (_, __, index) => index + 1,
            width: 50,
          },
          {
            dataIndex: 'name',
            title: 'Name',
            width: 300,
          },
          {
            dataIndex: 'value',
            title: 'Value',
            width: 400,
            render: (_, record) => (record.id === visibleKey?.id ? record.value : '---'),
          },
          {
            dataIndex: '',
            title: '',
            render: (_, record) => (
              <>
                <Button
                  icon={visibleKey?.id === record.id ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  type="text"
                  onClick={() => {
                    setVisibleKey((prev) => (prev?.id === record.id ? undefined : record))
                  }}
                />
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(record.value)
                    message.success('API Key copied to clipboard!')
                  }}
                />
              </>
            ),
          },
        ]}
      />
    )
  }, [apiKeysQ, visibleKey])

  return (
    <Page className="space-y-4">
      <Page.Header
        title="API Keys"
        description="API key will be used to authenticate you while sending request from your system."
      />

      <div className="flex items-center justify-end">
        <CreateApiKeyModal
          trigger={
            <Button icon={<PlusOutlined />} type="primary">
              Create API Key
            </Button>
          }
        />
      </div>

      {content}
    </Page>
  )
}
