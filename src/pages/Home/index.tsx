import React from "react"
import { type LoaderFunctionArgs } from "react-router-dom"
import { match } from "ts-pattern"
import getDataAsync from "../../utils/getDataAsync"
import usePageData from "../../hooks/usePageData"

const Banner = React.lazy(() => import("./components/Banner"))
const LargeAD = React.lazy(() => import("./components/LargeAD"))
const Recommend = React.lazy(() => import("./components/Recommend"))

export const Component: React.FC = () => {
  const { data: moduleList = [] } = usePageData<any[]>()
  return (
    <>
      {
        moduleList.map((d, index) => {
          const { component, ...props } = d
          return match(d)
            .with({ component: 'banner' }, () => <Banner key={index} {...props} />)
            .with({ component: 'recommend' }, () => <Recommend key={index} {...props} />)
            .with({ component: 'largeAD' }, () => <LargeAD key={index} {...props} />)
            .otherwise(() => <></>)
        })
      }
    </>
  )
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname
  return {
    pathname,
    pageData: await getDataAsync(params.lang, pathname),
  }
}
