import { Editor } from '@tinymce/tinymce-react'
import { ENV } from '~/utils/env'

type RichTextEditorProps = {
  initialValue?: string
  onChange?: (value: string) => void
}

export default function RichTextEditor({ initialValue, onChange }: RichTextEditorProps) {
  return (
    <Editor
      apiKey={ENV.VITE_TINY_MCE_KEY}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
      onEditorChange={(value) => {
        onChange?.(value)
      }}
    />
  )
}
