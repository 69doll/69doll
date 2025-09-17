import type SUPPORTED_LANGUAGE from "../constant/SUPPORTED_LANGUAGE"
import type { I18n, LoaderData } from "../data"

const loaderData = <O = any>(oldData: LoaderData<O> = {}) => {
  const data = oldData
  return {
    toObject () { return data },
    toJSON () { return JSON.stringify(data) },
    setDataUrl: (url: string) => data.dataUrl = url,
    getDataUrl () { return data.dataUrl },
    setSystemName (lang: SUPPORTED_LANGUAGE, content: string) {
      data.systemName ??= {}
      data.systemName[lang] = content
      return this
    },
    getSystemName (lang: SUPPORTED_LANGUAGE) { return data?.systemName?.[lang] },
    setPageName (lang: SUPPORTED_LANGUAGE, content: string) {
      data.pageName ??= {}
      data.pageName[lang] = content
      return this
    },
    getPageName (lang: SUPPORTED_LANGUAGE) { return data?.pageName?.[lang] },
    setTitle (lang: SUPPORTED_LANGUAGE, content: string) {
      data.title ??= {}
      data.title[lang] = content
      return this
    },
    getTitle (lang: SUPPORTED_LANGUAGE) { return data?.title?.[lang] },
    setDescription (lang: SUPPORTED_LANGUAGE, content: string) {
      data.description ??= {}
      data.description[lang] = content
      return this
    },
    getDescription (lang: SUPPORTED_LANGUAGE) { return data?.description?.[lang] },
    setKeywords (lang: SUPPORTED_LANGUAGE, content: string) {
      data.keywords ??= {}
      data.keywords[lang] = content
      return this
    },
    getKeywords (lang: SUPPORTED_LANGUAGE) { return data?.keywords?.[lang] },
    setI18n (lang: SUPPORTED_LANGUAGE, content: I18n) {
      data.i18n ??= {}
      data.i18n[lang] = content
      return this
    },
    getI18n (lang: SUPPORTED_LANGUAGE) { return data?.i18n?.[lang] },
    setData (lang: SUPPORTED_LANGUAGE, content: O) {
      data.data ??= {}
      data.data[lang] = content
      return this
    },
    getData (lang: SUPPORTED_LANGUAGE) { return data?.data?.[lang] },
  }
}

export default loaderData
