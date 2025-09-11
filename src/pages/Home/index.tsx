import { match } from "ts-pattern"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"
import { genLoaderData } from "../../data"
import { useLoaderData } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const VITE_API_DATA_DOMAIN = import.meta.env.VITE_API_DATA_DOMAIN

async function getDataAsync<D>(lang: string | undefined, pathname: string) {
  const url = new URL(pathname, VITE_API_DATA_DOMAIN).href
  try {
    console.log(url, '... fetching')
    const data = await fetch(url)
    const mockData = await data.json()
    console.error(url, '... fetch done')
    return genLoaderData<D>(lang, mockData)
  } catch (e) {
    console.error(url, '... fetch fail')
  }
  return genLoaderData<D>(lang, {})
}

export const Component: React.FC = () => {
  const { pageData: loaderData, pathname } = useLoaderData() as Awaited<ReturnType<typeof loader<any[]>>>
  const currentLanguage = useCurrentLanguage()
  const [dataMap, setDataMap] = useState(loaderData.data ?? {})
  useEffect(() => {
    if (dataMap[currentLanguage]) return
    getDataAsync(currentLanguage, pathname).then((d) => setDataMap(d.data ?? {} as any))
  }, [])
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
