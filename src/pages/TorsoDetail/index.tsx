import ContentLayout from "../../components/ContentLayout"
import { NavigateRealPath } from "../../routes"
import getSupportedLanguages from "../../utils/getSupporttedLanguages"

export const Component: React.FC = () => {
  return (
    <ContentLayout>

    </ContentLayout>
  )
}

export async function getStaticPaths () {
  const fakerIds = ['torso1', 'torso2'] // Replace with actual logic to fetch IDs
  return fakerIds
    .map((id) => getSupportedLanguages()
      .map((lang) => NavigateRealPath.TORSO_DETAIL(id, { lang }))
      .concat([NavigateRealPath.TORSO_DETAIL(id)])
    ).flat()
}
