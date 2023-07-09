import { Form, Input, Modal, ModalProps } from 'antd'
import { cloneElement, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useError from '~/hooks/use-error'
import { createApiKey } from '~/queries/api-key'
import { ApiKey } from '~/types/api-key'

type CreateApiKeyModalProps = Omit<ModalProps, 'open' | 'title' | 'onCancel' | 'onOk'> & {
  trigger: React.ReactElement<{ onClick: () => void }>
}

export default function CreateApiKeyModal({ trigger, ...props }: CreateApiKeyModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const { handleError } = useError()
  const queryClient = useQueryClient()

  const createApiKeyMutation = useMutation(createApiKey, {
    onError: handleError,
    onSuccess: (keyCreated) => {
      queryClient.setQueryData<ApiKey[]>(['api-keys'], (prev) => {
        if (!prev) return []

        return [keyCreated, ...prev]
      })
      setIsModalOpen(false)
      form.resetFields()
    },
  })

  return (
    <>
      {cloneElement(trigger, {
        onClick: () => {
          setIsModalOpen(true)
        },
      })}

      <Modal
        open={isModalOpen}
        title="Create API Key"
        onCancel={() => {
          setIsModalOpen(false)
        }}
        onOk={form.submit}
        okButtonProps={{
          loading: createApiKeyMutation.isLoading,
          disabled: createApiKeyMutation.isLoading,
        }}
        destroyOnClose
        {...props}
      >
        <Form
          className="mt-4"
          form={form}
          disabled={createApiKeyMutation.isLoading}
          onFinish={({ name }) => {
            createApiKeyMutation.mutate(name)
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required!' }]}>
            <Input placeholder="API Key Name" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
