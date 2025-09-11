import { useLoaderData } from "react-router-dom";
import loaderData from "../utils/loaderData";
import useCurrentLanguage from "./useCurrentLanguage";
import { useEffect, useMemo, useState } from "react";

export default function usePageData<V = any>(cb?: (setter: (v: V) => any) => any): V {
  const defaultLoaderData = loaderData(useLoaderData() as any)
  const currentLanguage = useCurrentLanguage()
  const [data, setData] = useState<V>()
  useEffect(() => {
    const existData = defaultLoaderData.getData(currentLanguage)
    if (!existData) {
      cb?.(setData)
    }
  }, [currentLanguage])
  return useMemo(() => defaultLoaderData.getData(currentLanguage) ?? data, [currentLanguage, data])
}
