import { genLoaderData } from "../../data"
import useJumpPage from "../../hooks/useJumpPage"
import usePageData1 from "../../hooks/usePageData1"
import { mockTorsosList } from "../../mock"
import CommonList from "../CommonList"

export const Component: React.FC = () => {
  const list = usePageData1((setter) => setter(mockTorsosList)) as typeof mockTorsosList
  const jumper = useJumpPage()
  const onClick = (index: number) => jumper.TORSO_DETAIL({ id: list[index].id })
  return (
    <CommonList list={list} onClick={onClick}></CommonList>
  )
}

export async function loader({ params }: any) {
  return genLoaderData(params.lang, {
    pageName: 'Torsos',
    data: mockTorsosList,
  })
}

