import { useQuery } from 'react-query'
import Navbar from '~/components/navbar'
import Page from '~/components/page'
import ReactMarkdown from '~/components/react-markdown'
import { fetchAboutUs } from '~/queries/docs'

export default function AboutUs() {
  const { data } = useQuery(['about-us'], fetchAboutUs)

  return (
    <Page className="space-y-4 mt-20">
      <Navbar />

      <div className="prose lg:prose-xl w-full max-w-[unset]">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </Page>
  )
}
