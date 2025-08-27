import ContentLayout from "../../components/ContentLayout"
import Doll69ComingSoon from "../../components/Doll69ComingSoon"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (
    <ContentLayout>
      <Doll69ComingSoon />
    </ContentLayout>
  )
}

export async function loader () {
  return loaderData()
    .setTitle('Dolls | 69Doll')
}
