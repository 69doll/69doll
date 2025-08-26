import ContentLayout from "../../components/ContentLayout"
import { NavigateRealPath } from "../../routes"
import getSupportedLanguages from "../../utils/getSupporttedLanguages"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (
    <ContentLayout>

    </ContentLayout>
  )
}

export async function getStaticPaths () {
  const fakerIds = ['accessory1', 'accessory2'] // Replace with actual logic to fetch IDs
  return fakerIds
    .map((id) => getSupportedLanguages()
      .map((lang) => NavigateRealPath.ACCESSORY_DETAIL(id, { lang }))
      .concat([NavigateRealPath.ACCESSORY_DETAIL(id)])
    ).flat()
}

export async function loader () {
  return loaderData()
    .setTitle('Accessory Detail | 69Doll')
}
