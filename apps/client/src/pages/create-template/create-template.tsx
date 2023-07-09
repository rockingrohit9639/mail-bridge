import { SaveOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Page from '~/components/page'
import RichTextEditor from '~/components/rich-text-editor'
import useError from '~/hooks/use-error'
import { createTemplate } from '~/queries/template'

export default function CreateTemplate() {
  const { handleError } = useError()
  const navigate = useNavigate()

  const createTemplateMutation = useMutation(createTemplate, {
    onError: handleError,
    onSuccess: () => {
      message.success('Template created successfully!')
      navigate('/templates')
    },
  })

  return (
    <Page>
      <Page.Header title="Create Template" description="Templates will be  used  as the content of your email." />

      <div className="bg-white shadow-sm p-4 rounded">
        <Form layout="vertical" onFinish={createTemplateMutation.mutate} disabled={createTemplateMutation.isLoading}>
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
            <RichTextEditor />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={createTemplateMutation.isLoading}
            loading={createTemplateMutation.isLoading}
            icon={<SaveOutlined />}
          >
            Create Template
          </Button>
        </Form>
      </div>
    </Page>
  )
}
