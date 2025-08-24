import type React from "react"
import ContentLayout from "../../components/ContentLayout"
import loaderData from "../../utils/loaderData"
import LANGUAGE from "../../constant/LANGUAGE"
import getI18nAsync from "../../utils/getI18nAsync.ts"

export const Component: React.FC = () => {
  return (<>
    <ContentLayout>
      Sign-In Page
    </ContentLayout>
  </>)
}

export async function loader ({ params }: any) {
  const i18nMap = {
    [LANGUAGE.ZH_CN]: () => import('./i18n/zh-cn.ts'),
    [LANGUAGE.EN_US]: () => import('./i18n/en-us.ts'),
  }
  const i18n = await getI18nAsync(i18nMap, params.lang)
  console.log('SignIn loader called with params:', params)
  return loaderData()
    .setTitle(`${i18n.signIn} | 69Doll`)
}
