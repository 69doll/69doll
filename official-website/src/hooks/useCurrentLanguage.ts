import React from "react";
import LANGUAGE from "../constant/LANGUAGE";
import transformI18nKey from "../utils/transformI18nKey";
import useRouterLanguage from "./useRouterLanguage";

export default function useCurrentLanguage() {
  const routerLang = useRouterLanguage()
  const [cacheLanguage, setCacheLanguage] = React.useState<string | undefined | null>(undefined)
  const [browserLanguage, setBrowserLanguage] = React.useState<string | undefined | null>(undefined)
  const defaultLanguage = LANGUAGE.EN_US;

  React.useEffect(() => {
    setCacheLanguage(localStorage.getItem('language'));
    setBrowserLanguage((navigator as any).browserLanguage || navigator.language || (navigator as any).userLanguage)
  }, []);

  const language = React.useMemo(() => {
    return transformI18nKey(routerLang ?? cacheLanguage ?? browserLanguage ?? defaultLanguage)
  }, [cacheLanguage, browserLanguage]);

  return language
}
