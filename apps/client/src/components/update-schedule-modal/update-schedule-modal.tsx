import { Form, Input, Modal, ModalProps } from 'antd'
import { cloneElement, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useError from '~/hooks/use-error'
import { updateScheduleEmail } from '~/queries/schedule-email'
import { ScheduledEmail, UpdateScheduleEmailDto } from '~/types/schedule-email'

type UpdateScheduleModalProps = Omit<ModalProps, 'open' | 'onOk' | 'onCancel'> & {
  id: string
  title: string
  description: string
  trigger: React.ReactElement<{ onClick: () => void }>
}

export default function UpdateScheduleModal({
  className,
  style,
  id,
  title,
  description,
  trigger,
  ...props
}: UpdateScheduleModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const { handleError } = useError()
  const queryClient = useQueryClient()

  const updateScheduleEmailMutation = useMutation((dto: UpdateScheduleEmailDto) => updateScheduleEmail(id, dto), {
    onError: handleError,
    onSuccess: (updatedScheduleEmail) => {
      queryClient.setQueryData<ScheduledEmail[]>(['scheduled-emails'], (prev) => {
        if (!prev) return []

        return prev.map((email) => {
          if (email.id === updatedScheduleEmail.id) {
            return updatedScheduleEmail
          }
          return email
        })
      })
      setIsModalOpen(false)
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
        className={className}
        style={style}
        open={isModalOpen}
        title={`Update ${title}`}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        destroyOnClose
        okText="Update"
        okButtonProps={{
          ...props.okButtonProps,
          disabled: updateScheduleEmailMutation.isLoading,
          loading: updateScheduleEmailMutation.isLoading,
        }}
        onOk={() => {
          form.submit()
        }}
        {...props}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{ title, description }}
          onFinish={updateScheduleEmailMutation.mutate}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Description is required!' }]}
          >
            <Input.TextArea placeholder="Enter description" rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
