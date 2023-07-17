import { useQuery } from 'react-query'
import Navbar from '~/components/navbar'
import Page from '~/components/page'
import ReactMarkdown from '~/components/react-markdown/react-markdown'
import { fetchDocs } from '~/queries/docs'

export default function Docs() {
  const { data } = useQuery(['docs'], fetchDocs)

  return (
    <Page className="mt-16 py-8">
      <Navbar />
      <div className="prose lg:prose-xl w-full max-w-[unset]">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </Page>
  )
}
