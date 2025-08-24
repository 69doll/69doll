import ContentLayout from "../../components/ContentLayout"
import { NavigatePath } from "../../routes"
import getSupportedLanguages from "../../utils/getSupporttedLanguages"

export const Component: React.FC = () => {
  return (
    <ContentLayout>

    </ContentLayout>
  )
}

export async function getStaticPaths () {
  const fakerIds = ['face1', 'face2'] // Replace with actual logic to fetch IDs
  return fakerIds
    .map((id) => getSupportedLanguages()
      .map((lang) => NavigatePath.FACE_DETAIL(lang, id)
    )).flat()
}
