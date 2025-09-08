import { genLoaderData } from "../../data"
import useJumpPage from "../../hooks/useJumpPage"
import usePageData from "../../hooks/usePageData"
import { mockAccessoriesList } from "../../mock"
import CommonList from "../CommonList"

export const Component: React.FC = () => {
  const list = usePageData((setter) => setter(mockAccessoriesList)) as typeof mockAccessoriesList
  const jumper = useJumpPage()
  const onClick = (index: number) => jumper.ACCESSORY_DETAIL({ id: list[index].id })
  return (
    <CommonList list={list} onClick={onClick}></CommonList>
  )
}

export async function loader({ params }: any) {
  return genLoaderData(params.lang, {
    pageName: 'Accessories',
    data: mockAccessoriesList,
  })
}
