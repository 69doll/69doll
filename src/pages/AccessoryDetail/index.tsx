import { useParams } from "react-router-dom"
import usePageData from "../../hooks/usePageData"
import { genLoaderData } from "../../data"
import { mockAccessoryDetails } from "../../mock"
import CommonDetail from "../CommonDetail"

export const Component: React.FC = () => {
  const { id: accessoryId } = useParams()
  const data = usePageData((setter) => setter(mockAccessoryDetails.find(({ id }) => id === accessoryId)))
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
