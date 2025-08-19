import type React from "react"
import Layout from "../../components/Layout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <Layout>
      Sign-In Page
    </Layout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('Sign In | 69Doll')
    .toObject()
}
