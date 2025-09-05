import ContentLayout from "../../components/ContentLayout"
import Doll69ComingSoon from "../../components/Doll69ComingSoon"
import { genLoaderData } from "../../data"

export const Component: React.FC = () => {
  return (
    <ContentLayout>
      <Doll69ComingSoon />
    </ContentLayout>
  )
}

export async function loader({ params }: any) {
  return genLoaderData(params.lang, {
    pageName: 'Accessory Detail',
  })
}
