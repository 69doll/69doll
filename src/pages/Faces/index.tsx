import { genLoaderData } from "../../data"
import useJumpPage from "../../hooks/useJumpPage"
import usePageData1 from "../../hooks/usePageData1"
import { mockFacesList } from "../../mock"
import CommonList from "../CommonList"

export const Component: React.FC = () => {
  const list = usePageData1((setter) => setter(mockFacesList)) as typeof mockFacesList
  const jumper = useJumpPage()
  const onClick = (index: number) => jumper.FACE_DETAIL({ id: list[index].id })
  return (
    <CommonList list={list} onClick={onClick}></CommonList>
  )
}
export async function loader({ params }: any) {
  return genLoaderData(params.lang, {
    pageName: 'Faces',
    data: mockFacesList,
  })
}

