import { useParams } from "react-router-dom"
import usePageData1 from "../../hooks/usePageData1"
import { genLoaderData } from "../../data"
import { mockFaceDetails } from "../../mock"
import CommonDetail from "../CommonDetail"

export const Component: React.FC = () => {
  const { id: dollId } = useParams()
  const data = usePageData1((setter) => setter(mockFaceDetails.find(({ id }) => id === dollId)))
  return (
    <CommonDetail data={data} />
  )
}

export async function loader({ params }: any) {
  const data = mockFaceDetails.find(({ id }) => id === params.id)
  return genLoaderData(params.lang, {
    pageName: data?.title,
    data: data,
  })
}
