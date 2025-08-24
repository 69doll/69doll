import type React from "react"
import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"

export const Component: React.FC = () => {
  return (<>
    <ContentLayout>
      404
    </ContentLayout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('404 Not Found | 69Doll')
}
