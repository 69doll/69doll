import getI18nAsync from "../../utils/getI18nAsync.ts"
import { i18nMap } from '../SignIn'
import { genLoaderData } from "../../data.ts"

export { Component } from '../SignIn'

export async function loader ({ params }: any) {
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return genLoaderData(params.lang, {
    pageName: i18n.forgot,
    i18n,
  })
}
