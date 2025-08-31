import { useLoaderData } from "react-router-dom"
import { match } from "ts-pattern"
import ContentLayout from "../../components/ContentLayout"
import { mockHomeData } from "../../mock"
import loaderData from "../../utils/loaderData"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"

export const Component: React.FC = () => {
  const data = useLoaderData() as ReturnType<typeof loaderData>
  return (
    <ContentLayout>
      {
        (data?.get?.<any[]>('data') ?? mockHomeData).map((d, index) => {
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

export async function loader () {
  return loaderData()
    .set('data', mockHomeData)
}
