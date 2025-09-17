import { useLoaderData } from "react-router-dom";
import useCurrentLanguage from "./useCurrentLanguage";
import { useEffect } from "react";
import useQueryFn from "./useQueryFn";
import type SUPPORTED_LANGUAGE from "../constant/SUPPORTED_LANGUAGE";

type I18N_MAP = {
  [lang in SUPPORTED_LANGUAGE]?: () => Promise<{ default: object }>;
};

export default function usePageI18n <
  M extends I18N_MAP,
  K extends keyof M = keyof M,
  IM extends M[K] extends () => Promise<{ default: any }> ? Awaited<ReturnType<M[K]>>['default'] : never = M[K] extends () => Promise<{ default: any }> ? Awaited<ReturnType<M[K]>>['default'] : never
>(i18nMap: M) {
  const preloadData = useLoaderData() as { i18n: IM }
  const currentLanguage = useCurrentLanguage()
  const args = useQueryFn(async () => {
    const i18n = await i18nMap[currentLanguage]?.()
    return (i18n?.default ?? i18n ?? {}) as IM
  }, { fetchOnMount: !preloadData, defaultData: preloadData?.i18n })
  const { refetch } = args
  useEffect(() => {
    refetch()
  }, [currentLanguage])
  return args
}
