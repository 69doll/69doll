import { compile, match as pMatch } from "path-to-regexp"
import { genLoaderData, type LoaderData } from "../data"

const VITE_API_DATA_DOMAIN = import.meta.env.VITE_API_DATA_DOMAIN
const isProd = import.meta.env.MODE === 'production'
const isSSR = import.meta.env.SSR

const toPathRepeated = compile("{/:mode}{/*segment}")

function transformsPathname (pathname: string) {
  const mode = isProd ? undefined : import.meta.env.MODE
  if (['', '/'].includes(pathname)) {
    if (mode) return `/${mode}`
    return pathname
  }
  const newPathname = toPathRepeated({
    mode: mode,
    segment: (pMatch("/*splat")(pathname) as any).params?.splat ?? [],
  })
  return newPathname
}

const cacheMap = new Map<string, any>()

async function getDataAsync<D>(lang: string | undefined, pathname: string): Promise<LoaderData<D>> {
  const url = new URL(transformsPathname(pathname), VITE_API_DATA_DOMAIN).href
  if (cacheMap.has(pathname)) {
    if (!isProd || isSSR) console.info(`[${pathname}]`, 'use cache data')
    return cacheMap.get(pathname)
  }
  const startedAt = Date.now()
  try {
    if (!isProd || isSSR) console.info(`[${pathname}]`, url, '... fetching')
    const data = await fetch(url)
    const mockData = await data.json()
    cacheMap.set(pathname, mockData)
    if (!isProd || isSSR) console.info(`[${pathname}]`, url, '... fetch done', `${Date.now() - startedAt}ms`)
    return genLoaderData<D>(lang, mockData)
  } catch (e) {
    if (!isProd || isSSR) console.error(`[${pathname}]`, url, '... fetch fail', `${Date.now() - startedAt}ms`)
  }
  cacheMap.set(pathname, {})
  return genLoaderData<D>(lang, {})
}

export default getDataAsync
