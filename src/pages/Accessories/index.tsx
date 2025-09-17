import type { LoaderFunctionArgs } from "react-router-dom"
import { genLoaderData } from "../../data"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"
import useJumpPage from "../../hooks/useJumpPage"
import usePageData from "../../hooks/usePageData"
import { mockAccessoriesList } from "../../mock"
import CommonList from "../CommonList"

export const Component: React.FC = () => {
  const currentLanguage = useCurrentLanguage()
  const { data: pageData } = usePageData(genLoaderData(currentLanguage, { data: mockAccessoriesList }))
  const jumper = useJumpPage()
  const onClick = (index: number) => pageData?.[index] && jumper.ACCESSORY_DETAIL({ id: pageData[index].id })
  return (
    <CommonList list={pageData ?? []} onClick={onClick}></CommonList>
  )
}

export async function loader({ params }: LoaderFunctionArgs) {
  return genLoaderData(params.lang, {
    pageName: 'Accessories',
    data: mockAccessoriesList,
  })
}
