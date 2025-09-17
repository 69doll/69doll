import { useLoaderData } from "react-router-dom";
import useCurrentLanguage from "./useCurrentLanguage";
import { useEffect, useMemo } from "react";
import useQueryFn from "./useQueryFn";
import type { LoaderData } from "../data";
import getDataAsync from "../utils/getDataAsync";
import { isSSR } from "../constant";

export default function usePageData<D> (mockData?: LoaderData<D>) {
  const preloadData = useLoaderData() as { pageData: LoaderData<D> }
  const realMockData = !isSSR ? mockData : undefined
  const currentLanguage = useCurrentLanguage()
  const args = useQueryFn(async () => {
    const pathname = location.pathname
    return mockData?.data ?? (await getDataAsync<D>(currentLanguage, pathname))?.data
  }, { fetchOnMount: !preloadData || !realMockData, defaultData: realMockData?.data ?? preloadData?.pageData?.data })
  const { data, refetch } = args
  const pageData = useMemo(() => data?.[currentLanguage], [currentLanguage, data])
  useEffect(() => {
    refetch()
  }, [currentLanguage])
  return { ...args, data: pageData }
}
