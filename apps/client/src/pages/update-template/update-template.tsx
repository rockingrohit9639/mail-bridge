import { ReloadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Result, Spin, message } from 'antd'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Page from '~/components/page'
import RichTextEditor from '~/components/rich-text-editor'
import useError from '~/hooks/use-error'
import { fetchTemplate, updateTemplate } from '~/queries/template'
import { UpdateTemplateDto } from '~/types/template'
import { getErrorMessage } from '~/utils/error'

export default function UpdateTemplate() {
  const { id } = useParams() as { id: string }
  const [form] = Form.useForm()
  const { handleError } = useError()

  const template = useQuery(['template', id], () => fetchTemplate(id), { enabled: Boolean(id) })

  const updateTemplateMutation = useMutation((dto: UpdateTemplateDto) => updateTemplate(id, dto), {
    onError: handleError,
    onSuccess: () => {
      message.success('Successfully updated template!')
    },
  })

  useEffect(
    function updateFormValues() {
      form.setFieldsValue({
        name: template?.data?.name,
        subject: template?.data?.subject,
      })
    },
    [form, template?.data],
  )

  if (template.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin>Loading Templates....</Spin>
      </div>
    )
  }

  if (template.error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Result status="error" title="Something went wrong" subTitle={getErrorMessage(template.error)} />
      </div>
    )
  }

  if (!template.data) {
    return null
  }

  return (
    <Page>
      <Page.Header title="Create Template" description="Templates will be  used  as the content of your email." />

      <div className="bg-white shadow-sm p-4 rounded">
        <Form
          form={form}
          layout="vertical"
          onFinish={updateTemplateMutation.mutate}
          disabled={updateTemplateMutation.isLoading}
        >
          <Form.Item
            name="name"
            label="Template Name"
            rules={[{ required: true, message: 'Template name is required!' }]}
          >
            <Input placeholder="Template name" />
          </Form.Item>

          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Subject is required!' }]}
            extra="This subject will be used as the subject on email sent to your users."
          >
            <Input placeholder="Subject" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Content is required!' }]}
            extra={
              <div>
                Please use{' '}
                <a className="italic underline" href="https://handlebarsjs.com/" target="_blank" rel="noreferrer">
                  *handlebars*
                </a>{' '}
                to format your template.
              </div>
            }
          >
            <RichTextEditor initialValue={template.data?.content} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={updateTemplateMutation.isLoading}
            loading={updateTemplateMutation.isLoading}
            icon={<ReloadOutlined />}
          >
            Update Template
          </Button>
        </Form>
      </div>
    </Page>
  )
}
