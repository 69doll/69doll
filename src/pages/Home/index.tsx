import { match } from "ts-pattern"
import ContentLayout from "../../components/ContentLayout"
import { mockHomeData } from "../../mock"
import loaderData from "../../utils/loaderData"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"
import usePageData from "../../hooks/usePageData"

export const Component: React.FC = () => {
  const data = usePageData<typeof mockHomeData>((set) => set(mockHomeData))
  return (
    <ContentLayout>
      {
        data.map((d: any, index) => {
          const { component, ...props } = d
          return match(d)
            .with({ component: 'banner' }, () => <Banner key={index} {...props} />)
            .with({ component: 'recommend' }, () => <Recommend key={index} {...props} />)
            .with({ component: 'largeAD' }, () => <LargeAD key={index} {...props} />)
            .otherwise(() => <></>)
        })
      }
    </ContentLayout>
  )
}

export async function loader ({ params }: any) {
  return loaderData()
    .setData(params.lang, mockHomeData)
}
