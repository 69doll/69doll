import type React from "react"
import Layout from "../../components/Layout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <Layout>
      404
    </Layout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('404 Not Found | 69Doll')
    .toObject()
}
