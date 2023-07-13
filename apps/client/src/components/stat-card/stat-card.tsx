import { Spin } from 'antd'
import clsx from 'clsx'
import { cloneElement } from 'react'

type StatCardProps = {
  className?: string
  style?: React.CSSProperties
  title: string
  value: string | number
  icon: React.ReactElement
  isLoading?: boolean
}

export default function StatCard({ className, style, title, value, icon, isLoading = false }: StatCardProps) {
  return (
    <div className={clsx('bg-white w-full h-full p-4 rounded shadow space-y-2', className)} style={style}>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin>Loading Stats</Spin>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            {cloneElement(icon)}
            <div className="text-lg">{title}</div>
          </div>
          <div className="text-2xl font-bold">{value}</div>
        </>
      )}
    </div>
  )
}
