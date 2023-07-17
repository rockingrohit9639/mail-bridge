import { CopyOutlined } from '@ant-design/icons'
import { message } from 'antd'
import clsx from 'clsx'
import { useCallback, useState } from 'react'

type PreProps = {
  children: any
}

export default function Pre({ children }: PreProps) {
  const [isCodeCopied, setIsCodeCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const content = children?.[0]?.props?.children
    navigator.clipboard.writeText(content)
    message.success('Code copied successfully!')
    setIsCodeCopied(true)
    setTimeout(() => setIsCodeCopied(false), 1000)
  }, [children])

  return (
    <pre className="relative">
      <div
        className="absolute right-4 top-4 cursor-pointer p-2 flex items-center justify-center rounded-md bg-white"
        onClick={handleCopy}
      >
        <CopyOutlined className={clsx('w-5 h-5 text-gray-500', isCodeCopied && 'text-green-500')} />
      </div>
      {children}
    </pre>
  )
}
