import axios from 'axios'

export async function fetchDocs() {
  const { data } = await axios.get('/docs/getting-started.md')
  return data
}

export async function fetchAboutUs() {
  const { data } = await axios.get('/docs/about-us.md')
  return data
}
