import loaderData from "../../utils/loaderData.ts"
import getI18nAsync from "../../utils/getI18nAsync.ts"
import { i18nMap } from '../SignIn'

export { Component } from '../SignIn'

export async function loader ({ params }: any) {
  const i18n = await getI18nAsync(i18nMap, params.lang)
  return loaderData()
    .setTitle(`${i18n.signUp} | 69Doll`)
    .toObject()
}
