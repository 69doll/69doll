import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <ContentLayout>
      Sign-Up Page
    </ContentLayout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('Sign Up | 69Doll')
}
