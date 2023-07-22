import { Input, InputRef, Tag, Tooltip, message } from 'antd'
import { useRef, useState } from 'react'

type TagInputProps = {
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  value?: string[]
  onChange?: (value: string[]) => void
}

export default function TagInput({ value = [], onChange, placeholder, ...props }: TagInputProps) {
  const [content, setContent] = useState<string>()
  const inputRef = useRef<InputRef>(null)

  const handleDelete = (tag: string) => {
    const newArr = value.filter((i) => i !== tag)
    onChange?.(newArr)
    message.destroy()
  }

  const handleBlur = () => {
    if (content) {
      if (value.includes(content)) {
        message.warning(`[tag: ${content}] already exists`)
        return
      }
      onChange?.([...value, content])
      setContent('')
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content) {
      if (value.includes(content)) {
        message.warning(`[tag: ${content}] already exists`)
        return
      }
      onChange?.([...value, content])
      setContent('')
    }
  }

  return (
    <div className="border rounded border-primary px-2" onClick={() => inputRef.current?.focus()} {...props}>
      {value.length > 0 ? (
        <div className="p-2">
          {value.map((item) =>
            item.length > 20 ? (
              <Tooltip title={item} key={item}>
                <Tag closable onClose={() => handleDelete(item)}>{`${item.slice(0, 20)}...`}</Tag>
              </Tooltip>
            ) : (
              <Tag closable key={item} onClose={() => handleDelete(item)}>
                {item}
              </Tag>
            ),
          )}
        </div>
      ) : null}

      <Input
        ref={inputRef}
        bordered={false}
        placeholder={placeholder}
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </div>
  )
}
