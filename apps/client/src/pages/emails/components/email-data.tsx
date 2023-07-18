import { camelToNormalCase } from '~/utils/format'

type EmailDataProps = {
  className?: string
  style?: React.CSSProperties
  data: Record<string, any>
}

export default function EmailData({ className, style, data }: EmailDataProps) {
  return (
    <div className={className} style={style}>
      {Object.entries(data).map(([key, value]) => {
        return (
          <div key={key}>
            <span className="capitalize">{camelToNormalCase(key)} : </span>
            <span className="font-medium">{value}</span>
          </div>
        )
      })}
    </div>
  )
}
