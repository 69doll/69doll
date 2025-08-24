import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <ContentLayout>
      Forgot Page
    </ContentLayout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('Forgot | 69Doll')
}
