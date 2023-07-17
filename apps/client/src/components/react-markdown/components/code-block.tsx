import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  language: string
  value: string
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <SyntaxHighlighter language={language} style={nord}>
      {value}
    </SyntaxHighlighter>
  )
}
