import { useMemo } from "react"
import { useLoaderData } from "react-router-dom"
import { match } from "ts-pattern"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"
import getDataAsync from "../../utils/getDataAsync"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

export const Component: React.FC = () => {
  const preloadData = useLoaderData() as Awaited<ReturnType<typeof loader<any[]>>>
  const { pageData: loaderData } = preloadData ?? {}
  const currentLanguage = useCurrentLanguage()
  const dataMap = useMemo(() => loaderData?.data ?? {}, [loaderData])
  const data = useMemo(() => dataMap[currentLanguage] ?? [], [currentLanguage])
  return (
    <>
      {
        data?.map((d: any, index) => {
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

export async function loader <D>({ params, request }: any) {
  const pathname = new URL(request.url).pathname
  return {
    pathname,
    pageData: await getDataAsync<D>(params.lang, pathname)
  }
}
