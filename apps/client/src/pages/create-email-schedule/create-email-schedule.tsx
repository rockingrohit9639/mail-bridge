import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd'
import { useCallback, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import Page from '~/components/page'
import TagInput from '~/components/tag-input'
import useError from '~/hooks/use-error'
import { createScheduleMail } from '~/queries/schedule-email'
import { fetchTemplates } from '~/queries/template'
import { CreateScheduleEmailDto, ScheduledEmailType } from '~/types/schedule-email'

export default function CreateMailSchedule() {
  const { data, isLoading: templateLoading } = useQuery(['templates'], fetchTemplates)
  const { handleError } = useError()
  const [form] = Form.useForm()

  const scheduleEmailMutation = useMutation(createScheduleMail, {
    onError: handleError,
    onSuccess: () => {
      message.success('Your email has been scheduled successfully!')
      form.resetFields()
    },
  })

  const templateOptions = useMemo(() => {
    if (!data) return []

    return data.map((template) => ({ label: template.name, value: template.id }))
  }, [data])

  const handleScheduleEmail = useCallback(
    (values: CreateScheduleEmailDto) => {
      Modal.confirm({
        title: 'Create scheduled email',
        content: (
          <div>
            <div>Are you sure you want to create this scheduled email?</div>
            <div className="text-red-400">
              Once the schedule is created it cannot be deleted until the job has completed nor the schedule time will
              be updated.
            </div>
          </div>
        ),
        okText: 'Yes',
        okButtonProps: { danger: true },
        cancelText: 'No',
        type: 'error',
        onOk: () => {
          scheduleEmailMutation.mutate(values)
        },
      })
    },
    [scheduleEmailMutation],
  )

  return (
    <Page>
      <Page.Header title="Create Email Schedule" description="You can schedule your emails right away here." />

      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-2 gap-4"
        onFinish={(values) => {
          const dataToSubmit = {
            ...values,
            scheduledTime: values.scheduledTime.toISOString(),
          }

          handleScheduleEmail(dataToSubmit)
        }}
        disabled={scheduleEmailMutation.isLoading}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
          <Input placeholder="What is email about ?" />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Type is required' }]}>
          <Select
            placeholder="Select type"
            options={Object.keys(ScheduledEmailType).map((key) => ({ label: key, value: key }))}
          />
        </Form.Item>
        <Form.Item name="scheduledTime" label="Scheduled Time" rules={[{ required: true, message: 'Scheduled Time' }]}>
          <DatePicker placeholder="Scheduled Time" className="w-full" showTime />
        </Form.Item>
        <Form.Item name="template" label="Template" rules={[{ required: true, message: 'Template is required' }]}>
          <Select options={templateOptions} placeholder="Select Template" loading={templateLoading} />
        </Form.Item>

        <Form.Item
          name="to"
          label="To"
          rules={[
            { required: true, message: 'To is required' },
            { type: 'array', max: 20, message: 'Maximum 20 recipients are allowed!' },
          ]}
        >
          <TagInput placeholder="Enter all recipient emails" />
        </Form.Item>

        <Form.Item name="description" label="Description" className="col-span-full">
          <Input.TextArea placeholder="Description" rows={5} />
        </Form.Item>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.submit()
          }}
          disabled={scheduleEmailMutation.isLoading}
          loading={scheduleEmailMutation.isLoading}
        >
          Schedule Email
        </Button>
      </Form>
    </Page>
  )
}
