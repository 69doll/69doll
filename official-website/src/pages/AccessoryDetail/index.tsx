import { useParams } from "react-router-dom"
import usePageData1 from "../../hooks/usePageData1"
import { genLoaderData } from "../../data"
import { mockAccessoryDetails } from "../../mock"
import CommonDetail from "../CommonDetail"

export const Component: React.FC = () => {
  const { id: accessoryId } = useParams()
  const data = usePageData1((setter) => setter(mockAccessoryDetails.find(({ id }) => id === accessoryId)))
  return (
    <CommonDetail data={data} />
  )
}

export async function loader({ params }: any) {
  const data = mockAccessoryDetails.find(({ id }) => id === params.id)
  return genLoaderData(params.lang, {
    pageName: data?.title,
    data: data,
  })
}
