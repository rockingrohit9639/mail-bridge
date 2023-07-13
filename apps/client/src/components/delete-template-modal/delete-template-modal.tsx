import { DeleteOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Modal } from 'antd'
import { useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useError from '~/hooks/use-error'
import { deleteTemplate } from '~/queries/template'
import { Template } from '~/types/template'

type DeleteTemplateModalProps = ButtonProps & {
  templateId: string
}

export default function DeleteTemplateModal({ templateId, ...props }: DeleteTemplateModalProps) {
  const { handleError } = useError()
  const queryClient = useQueryClient()

  const deleteTemplateMutation = useMutation(deleteTemplate, {
    onError: handleError,
    onSuccess: (deletedTemplate) => {
      queryClient.setQueryData<Template[]>(['templates'], (prev) => {
        if (!prev) return []
        return prev.filter((template) => template.id !== deletedTemplate.id)
      })
    },
  })

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: 'Delete Template?',
      content: 'Are you sure you want to delete this template?',
      okButtonProps: { danger: true, loading: deleteTemplateMutation.isLoading },
      okText: 'Yes, Delete this template',
      cancelText: 'No, Cancel',
      onOk: () => {
        deleteTemplateMutation.mutate(templateId)
      },
      type: 'error',
    })
  }, [deleteTemplateMutation, templateId])

  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      loading={deleteTemplateMutation.isLoading}
      disabled={deleteTemplateMutation.isLoading}
      onClick={handleDelete}
      size="small"
      {...props}
    />
  )
}
