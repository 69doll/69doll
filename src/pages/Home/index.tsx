import { useEffect, useMemo, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { match } from "ts-pattern"
import { compile, match as pMatch } from "path-to-regexp"
import Banner from "./components/Banner"
import LargeAD from "./components/LargeAD"
import Recommend from "./components/Recommend"
import { genLoaderData } from "../../data"
import useCurrentLanguage from "../../hooks/useCurrentLanguage"

const VITE_API_DATA_DOMAIN = import.meta.env.VITE_API_DATA_DOMAIN
const isProd = import.meta.env.MODE === 'production'
const isSSR = import.meta.env.SSR

const toPathRepeated = compile("{/:mode}{/*segment}")

function transformsPathname (pathname: string) {
  const mode = isProd ? undefined : import.meta.env.MODE
  if (pathname === '/') {
    if (mode) return `/${mode}`
    return pathname
  }
  const newPathname = toPathRepeated({
    mode: mode,
    segment: (pMatch("/*splat")(pathname) as any).params?.splat ?? [],
  })
  return newPathname
}

async function getDataAsync<D>(lang: string | undefined, pathname: string) {
  const url = new URL(transformsPathname(pathname), VITE_API_DATA_DOMAIN).href
  try {
    if (!isProd || isSSR) console.log(url, '... fetching')
    const data = await fetch(url)
    const mockData = await data.json()
    if (!isProd || isSSR) console.log(url, '... fetch done')
    return genLoaderData<D>(lang, mockData)
  } catch (e) {
    if (!isProd || isSSR) console.error(url, '... fetch fail')
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
