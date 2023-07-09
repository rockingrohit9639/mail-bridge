import clsx from 'clsx'

type PageProps = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function Page({ className, style, children }: PageProps) {
  return (
    <div className={clsx(className, 'max-w-screen-xl mx-auto')} style={style}>
      {children}
    </div>
  )
}
