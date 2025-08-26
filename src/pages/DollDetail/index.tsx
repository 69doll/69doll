import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (
    <ContentLayout>

    </ContentLayout>
  )
}

export async function loader () {
  return loaderData()
    .setTitle('Doll Detail | 69Doll')
}
