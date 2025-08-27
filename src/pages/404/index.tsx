import type React from "react"
import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"
import Doll69Center from "../../components/Doll69Center"

export const Component: React.FC = () => {
  return (<>
    <ContentLayout>
      <Doll69Center style={{ width: '100%', height: '80vh', fontSize: '45px' }}>
        404 Not Found
      </Doll69Center>
    </ContentLayout>
  </>)
}

export async function loader () {
  return loaderData()
    .setTitle('404 Not Found | 69Doll')
}
