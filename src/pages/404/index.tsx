import type React from "react"
import ContentLayout from "../../components/ContentLayout"
import Doll69Center from "../../components/Doll69Center"
import getI18nAsync from "../../utils/getI18nAsync"
import SUPPORTED_LANGUAGE from "../../constant/SUPPORTED_LANGUAGE"
import useI18n from "../../hooks/useI18n.ts"
import { genLoaderData } from "../../data.ts"

export const i18nMap = {
  [SUPPORTED_LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
  [SUPPORTED_LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
}

export const Component: React.FC = () => {
  const i18n = useI18n(i18nMap)
  return (<>
    <ContentLayout>
      <Doll69Center style={{ width: '100%', height: '80vh', fontSize: '45px' }}>
        { i18n['404'] }
      </Doll69Center>
    </ContentLayout>
  </>)
}

export async function loader ({ params }: any) {
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return genLoaderData(params.lang, {
    pageName: i18n['404'],
    i18n,
  })
}
