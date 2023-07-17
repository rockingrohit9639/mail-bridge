import Markdown from 'react-markdown'
import CodeBlock from './components/code-block'
import Pre from './components/pre'

type ReactMarkdownProps = {
  className?: string
  children: string
}

export default function ReactMarkdown({ className, children }: ReactMarkdownProps) {
  return (
    <Markdown
      className={className}
      components={{
        pre: ({ children }) => <Pre>{children}</Pre>,
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        },
      }}
    >
      {children}
    </Markdown>
  )
}
