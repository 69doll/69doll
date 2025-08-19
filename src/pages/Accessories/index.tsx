import Layout from "../../components/Layout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (
    <Layout>

    </Layout>
  )
}

export async function loader () {
  return loaderData()
    .setTitle('Accessories | 69Doll')
    .toObject()
}
