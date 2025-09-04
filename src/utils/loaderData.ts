import type SUPPORTED_LANGUAGE from "../constant/SUPPORTED_LANGUAGE"
import transformI18nKey from "./transformI18nKey"

const HEAD_KEY = '__head__'
const DATA_URL_KEY = '__dataUrl__'
const I18N_KEY = '__i18n__'
const DATA_KEY = '__data__'

const loaderData = (oldData: Record<string|number|symbol, any> = {}) => {
  const data = oldData
  return {
    toObject () { return data },
    toJSON () { return JSON.stringify(data) },
    setTitle(title: string) {
      data[HEAD_KEY] ??= {}
      data[HEAD_KEY].title = title
      return this
    },
    getTitle () { return data[HEAD_KEY]?.title as string | undefined },
    setMetaData(object: object) {
      data[HEAD_KEY] ??= {}
      data[HEAD_KEY].metaData ??= []
      data[HEAD_KEY].metaData.push(object)
      return this
    },
    getMetaData (): any[] { return data[HEAD_KEY]?.metaData ?? [] },
    set(key: string | symbol, value: any) {
      data[key] = value
      return this
    },
    get: <V = any>(key: string | symbol) => data[key] as V,
    setDataUrl: (url: string) => data[DATA_URL_KEY] = url,
    getDataUrl () { return data[DATA_URL_KEY] as string | undefined },
    setI18n(lang: SUPPORTED_LANGUAGE, content: object) {
      data[I18N_KEY] ??= {}
      data[I18N_KEY][lang] = content
      return this
    },
    getI18n (lang?: SUPPORTED_LANGUAGE) { return lang ? data[I18N_KEY][lang] ?? {} : {} },
    setData(lang: string, content: any) {
      data[DATA_KEY] ??= {}
      data[DATA_KEY][transformI18nKey(lang)] = content
      return this
    },
    getData (lang?: string) { return lang ? data[DATA_KEY]?.[transformI18nKey(lang)] : undefined },
  }
}

export default loaderData
