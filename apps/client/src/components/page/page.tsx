import { Divider } from 'antd'
import clsx from 'clsx'

type PageProps = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

type PageHeaderProps = {
  title: string
  description?: string
}

export default function Page({ className, style, children }: PageProps) {
  return (
    <div className={clsx(className, 'max-w-screen-xl mx-auto min-h-screen')} style={style}>
      {children}
    </div>
  )
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <div className="px-4 py-2 rounded ">
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
      </div>
      <Divider />
    </>
  )
}

Page.Header = PageHeader
