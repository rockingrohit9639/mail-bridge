import { PlusOutlined } from '@ant-design/icons'
import { Button, Empty, Result, Spin } from 'antd'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import Page from '~/components/page'
import { fetchApiKeys } from '~/queries/api-key'
import { getErrorMessage } from '~/utils/error'

export default function ApiKeys() {
  const apiKeysQ = useQuery(['api-keys'], fetchApiKeys)

  const content = useMemo(() => {
    if (apiKeysQ.isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Spin>Loading your keys</Spin>
        </div>
      )
    }

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
      <div className="grid grid-cols-8 bg-primary text-white px-4 py-2">
        <div className="col-span-2">Name</div>
        <div className="col-span-2">Value</div>
        <div className="col-span-4">View</div>
      </div>
    )
  }, [apiKeysQ])

  return (
    <Page className="space-y-4">
      <Page.Header
        title="API Keys"
        description="API key will be used to authenticate you while sending request from your system."
      />

      <div className="flex items-center justify-end">
        <Button type="primary" icon={<PlusOutlined />}>
          Create API Key
        </Button>
      </div>

      {content}
    </Page>
  )
}
