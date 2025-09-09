import { useParams } from "react-router-dom"
import usePageData from "../../hooks/usePageData"
import { genLoaderData } from "../../data"
import { mockDollDetails } from "../../mock"
import CommonDetail from "../CommonDetail"

export const Component: React.FC = () => {
  const { id: dollId } = useParams()
  const data = usePageData((setter) => setter(mockDollDetails.find(({ id }) => id === dollId)))
  return (
    <CommonDetail
      data={data}
    />
  )
}

export async function loader({ params }: any) {
  const data = mockDollDetails.find(({ id }) => id === params.id)
  return genLoaderData(params.lang, {
    pageName: data?.title,
    data: data,
  })
}
