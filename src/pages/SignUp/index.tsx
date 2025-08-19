import Layout from "../../components/Layout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <Layout>
      Sign-Up Page
    </Layout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('Sign Up | 69Doll')
    .toObject()
}
