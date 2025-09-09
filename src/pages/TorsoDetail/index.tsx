import { useParams } from "react-router-dom"
import usePageData from "../../hooks/usePageData"
import { genLoaderData } from "../../data"
import { mockTorsoDetails } from "../../mock"
import CommonDetail from "../CommonDetail"

export const Component: React.FC = () => {
  const { id: torsoId } = useParams()
  const data = usePageData((setter) => setter(mockTorsoDetails.find(({ id }) => id === torsoId)))
  return (
    <CommonDetail data={data} />
  )
}

export async function loader({ params }: any) {
  const data = mockTorsoDetails.find(({ id }) => id === params.id)
  return genLoaderData(params.lang, {
    pageName: data?.title,
    data: data,
  })
}
