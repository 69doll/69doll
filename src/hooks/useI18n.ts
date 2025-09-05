import { useEffect, useMemo, useState } from "react";
import getI18nAsync from "../utils/getI18nAsync";
import useCurrentLanguage from "./useCurrentLanguage";
import { useLoaderData } from "react-router-dom";
import loaderData from "../utils/loaderData";

export default function useI18n <T extends object>(i18nMap: Parameters<typeof getI18nAsync<T>>[0]) {
  const defaultLoaderData = loaderData(useLoaderData() as any)
  const currentLanguage = useCurrentLanguage()
  const [i18n, setI18n] = useState<T>()
  useEffect(() => {
    const existI18n = defaultLoaderData.getI18n(currentLanguage)
    if (!existI18n) {
      getI18nAsync(i18nMap, currentLanguage).then((content) => setI18n(content))
    }
  }, [currentLanguage])
  return useMemo(() => defaultLoaderData?.getI18n(currentLanguage) ?? i18n, [currentLanguage]) as T
}
