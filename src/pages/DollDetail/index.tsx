import Layout from "../../components/Layout"
import { NavigatePath } from "../../routes"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (
    <Layout>

    </Layout>
  )
}

export async function getStaticPaths () {
  return ['aaa', 'bbb'].map((id) => NavigatePath.DOLL_DETAIL(id))
}

export async function loader () {
  return loaderData()
    .setTitle('Doll Detail | 69Doll')
    .toObject()
}
