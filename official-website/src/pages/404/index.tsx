import type React from "react"
import Doll69Center from "../../components/Doll69Center"
import getI18nAsync from "../../utils/getI18nAsync"
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE"
import { type LoaderFunctionArgs } from "react-router-dom"
import usePageI18n from "../../hooks/usePageI18n.ts"

export const i18nMap = {
  [SUPPORTED_LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
  [SUPPORTED_LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
} as const

export const Component: React.FC = () => {
  const { data: i18n, haveData } = usePageI18n(i18nMap)
  return (<>
    <Doll69Center style={{ width: '100%', minHeight: '80vh', fontSize: '45px', color: 'white' }}>
      { haveData && i18n['404'] }
    </Doll69Center>
  </>)
}

export async function loader ({ params, request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return {
    pathname,
    pageName: i18n['404'],
    i18n,
  }
}
